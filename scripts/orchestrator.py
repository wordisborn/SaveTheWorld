#!/usr/bin/env python3
"""
SaveTheWorld Agent Orchestrator

Main entry point for running agents. Handles:
- Loading agent identity and context
- Calling Claude API
- Executing tool calls with ethical checks
- Logging to audit trail
- Tracking costs
"""

import argparse
import os
import sys
from pathlib import Path
from typing import Optional

from utils.claude_client import ClaudeClient
from utils.git_ops import GitOps
from audit import AuditLogger, create_action
from cost_tracker import CostTracker
from ethics import EthicsChecker, check_all


class Orchestrator:
    """Orchestrate agent runs."""

    def __init__(
        self,
        mock_mode: bool = False,
        repo_path: Optional[str] = None
    ):
        """
        Initialize the orchestrator.

        Args:
            mock_mode: If True, use mock Claude responses
            repo_path: Path to the repository
        """
        self.repo_path = Path(repo_path or os.getcwd())
        self.mock_mode = mock_mode

        self.claude = ClaudeClient(mock_mode=mock_mode)
        self.git = GitOps(str(self.repo_path))
        self.audit = AuditLogger(str(self.repo_path / "audit"))
        self.costs = CostTracker(
            str(self.repo_path / "config" / "limits.yaml"),
            str(self.repo_path / "audit" / "cost-tracking.json")
        )
        self.ethics = EthicsChecker()

    def load_file(self, path: str) -> str:
        """Load a file from the repository."""
        full_path = self.repo_path / path
        if full_path.exists():
            return full_path.read_text()
        return ""

    def load_agent_identity(self, agent_type: str) -> str:
        """Load an agent's identity file."""
        identity_path = f"agents/{agent_type}.md"
        identity = self.load_file(identity_path)
        if not identity:
            raise ValueError(f"Agent identity not found: {identity_path}")
        return identity

    def load_context(self, agent_type: str) -> tuple[str, list]:
        """
        Load context for an agent run.

        Returns:
            (context_string, list_of_files_read)
        """
        files_read = []
        context_parts = []

        # Always load CLAUDE.md
        claude_md = self.load_file("CLAUDE.md")
        if claude_md:
            context_parts.append(f"# System Constitution\n\n{claude_md}")
            files_read.append("CLAUDE.md")

        # Load agent-specific context
        if agent_type == "scout":
            needs_graph = self.load_file("scouting/needs-graph.md")
            if needs_graph:
                context_parts.append(f"# Current Needs Graph\n\n{needs_graph}")
                files_read.append("scouting/needs-graph.md")

        elif agent_type == "council":
            # Load ready proposals
            ready_dir = self.repo_path / "scouting" / "ready"
            if ready_dir.exists():
                for prop_file in ready_dir.glob("*.md"):
                    content = prop_file.read_text()
                    context_parts.append(f"# Proposal: {prop_file.name}\n\n{content}")
                    files_read.append(f"scouting/ready/{prop_file.name}")

        elif agent_type in ("architect", "foreman", "artisan"):
            # Load relevant scrolls
            scrolls_dir = self.repo_path / "scrolls"
            if scrolls_dir.exists():
                for scroll_file in scrolls_dir.glob("*.md"):
                    content = scroll_file.read_text()
                    context_parts.append(f"# Scroll: {scroll_file.name}\n\n{content}")
                    files_read.append(f"scrolls/{scroll_file.name}")

        return "\n\n---\n\n".join(context_parts), files_read

    def run_agent(
        self,
        agent_type: str,
        task: str,
        trigger: str = "manual",
        workflow: str = "orchestrator.py",
        run_id: Optional[str] = None
    ) -> dict:
        """
        Run an agent.

        Args:
            agent_type: Type of agent (scout, council, architect, etc.)
            task: The task to perform
            trigger: What triggered this run
            workflow: Workflow name for audit
            run_id: Optional run ID

        Returns:
            Dict with run results
        """
        # Start audit record
        record = self.audit.start_run(
            agent=agent_type,
            agent_identity=f"{agent_type}-01",
            trigger=trigger,
            workflow=workflow,
            run_id=run_id
        )

        try:
            # Check budget
            allowed, reason = self.costs.check_run_budget(15000)  # Estimate
            if not allowed:
                record.outcome = "blocked"
                record.error = reason
                self.audit.save(record)
                return {"success": False, "error": reason}

            # Load identity and context
            identity = self.load_agent_identity(agent_type)
            context, files_read = self.load_context(agent_type)
            record.files_read = files_read

            # Build system prompt
            system_prompt = f"""You are an agent in the SaveTheWorld collective.
Your task: {task}

Follow the governance protocols in CLAUDE.md.
Act with integrity according to your role.
"""

            # Invoke Claude
            response = self.claude.invoke_agent(
                agent_identity=identity,
                context=context,
                system_prompt=system_prompt,
                max_tokens=4096
            )

            # Record token usage
            record.token_input = response.usage.input_tokens
            record.token_output = response.usage.output_tokens
            self.costs.log_usage(
                run_id=record.run_id,
                agent=agent_type,
                input_tokens=response.usage.input_tokens,
                output_tokens=response.usage.output_tokens
            )

            # Process response
            record.notes = response.content[:500]  # First 500 chars
            record.outcome = "success"

            # Save audit record
            audit_path = self.audit.save(record)

            return {
                "success": True,
                "run_id": record.run_id,
                "content": response.content,
                "tool_calls": response.tool_calls,
                "tokens": {
                    "input": response.usage.input_tokens,
                    "output": response.usage.output_tokens
                },
                "audit_path": str(audit_path)
            }

        except Exception as e:
            record.outcome = "error"
            record.error = str(e)
            self.audit.save(record)
            return {"success": False, "error": str(e)}


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description="SaveTheWorld Agent Orchestrator")
    parser.add_argument("agent", help="Agent type (scout, council, architect, foreman, artisan)")
    parser.add_argument("task", help="Task to perform")
    parser.add_argument("--mock", action="store_true", help="Use mock responses")
    parser.add_argument("--trigger", default="manual", help="Trigger source")
    parser.add_argument("--workflow", default="orchestrator.py", help="Workflow name")
    parser.add_argument("--run-id", help="Run ID (generated if not provided)")

    args = parser.parse_args()

    orchestrator = Orchestrator(mock_mode=args.mock)
    result = orchestrator.run_agent(
        agent_type=args.agent,
        task=args.task,
        trigger=args.trigger,
        workflow=args.workflow,
        run_id=args.run_id
    )

    if result["success"]:
        print(f"Run completed: {result['run_id']}")
        print(f"Tokens: {result['tokens']['input']} in, {result['tokens']['output']} out")
        print(f"Audit: {result['audit_path']}")
    else:
        print(f"Run failed: {result['error']}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
