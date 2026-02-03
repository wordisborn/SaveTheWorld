"""
Audit logging for SaveTheWorld agents.

Every agent run produces a structured audit record capturing:
- What was read
- What decisions were made
- What actions were taken
- Token usage and costs
"""

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional
from dataclasses import dataclass, field, asdict
import uuid


@dataclass
class AuditAction:
    """A single action taken during an agent run."""
    action_id: str
    action_type: str
    target: str
    description: str
    approved: bool
    result: Optional[str] = None
    error: Optional[str] = None


@dataclass
class AuditRecord:
    """Complete audit record for an agent run."""
    run_id: str
    timestamp: str
    agent: str
    agent_identity: str
    trigger: str
    workflow: str

    # Context
    files_read: list = field(default_factory=list)
    token_input: int = 0
    token_output: int = 0

    # Actions taken
    actions: list = field(default_factory=list)

    # Outcome
    outcome: str = "pending"
    notes: str = ""
    error: Optional[str] = None

    def add_action(self, action: AuditAction):
        """Add an action to the audit record."""
        self.actions.append(asdict(action))

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return asdict(self)

    def to_json(self, indent: int = 2) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=indent)


class AuditLogger:
    """Manages audit logging for agent runs."""

    def __init__(self, audit_dir: str = "audit"):
        """
        Initialize the audit logger.

        Args:
            audit_dir: Base directory for audit logs
        """
        self.audit_dir = Path(audit_dir)

    def _get_log_path(self, timestamp: datetime) -> Path:
        """Get the path for a log file based on timestamp."""
        return self.audit_dir / timestamp.strftime("%Y/%m/%d")

    def start_run(
        self,
        agent: str,
        agent_identity: str,
        trigger: str,
        workflow: str,
        run_id: Optional[str] = None
    ) -> AuditRecord:
        """
        Start a new audit record for an agent run.

        Args:
            agent: Agent type (scout, council, etc.)
            agent_identity: Specific agent identity
            trigger: What triggered this run
            workflow: Workflow name
            run_id: Optional run ID (generated if not provided)

        Returns:
            New AuditRecord
        """
        return AuditRecord(
            run_id=run_id or str(uuid.uuid4()),
            timestamp=datetime.now(timezone.utc).isoformat(),
            agent=agent,
            agent_identity=agent_identity,
            trigger=trigger,
            workflow=workflow
        )

    def save(self, record: AuditRecord) -> Path:
        """
        Save an audit record to disk.

        Args:
            record: The audit record to save

        Returns:
            Path to the saved file
        """
        timestamp = datetime.fromisoformat(record.timestamp.replace("Z", "+00:00"))
        log_dir = self._get_log_path(timestamp)
        log_dir.mkdir(parents=True, exist_ok=True)

        filename = f"{record.agent}-{record.run_id[:8]}.json"
        log_path = log_dir / filename

        with open(log_path, "w") as f:
            f.write(record.to_json())

        return log_path

    def load(self, path: Path) -> AuditRecord:
        """Load an audit record from disk."""
        with open(path) as f:
            data = json.load(f)

        record = AuditRecord(
            run_id=data["run_id"],
            timestamp=data["timestamp"],
            agent=data["agent"],
            agent_identity=data["agent_identity"],
            trigger=data["trigger"],
            workflow=data["workflow"]
        )

        record.files_read = data.get("files_read", [])
        record.token_input = data.get("token_input", 0)
        record.token_output = data.get("token_output", 0)
        record.actions = data.get("actions", [])
        record.outcome = data.get("outcome", "unknown")
        record.notes = data.get("notes", "")
        record.error = data.get("error")

        return record

    def list_runs(self, date: Optional[datetime] = None, agent: Optional[str] = None) -> list:
        """
        List audit records, optionally filtered by date and agent.

        Args:
            date: Filter to specific date
            agent: Filter to specific agent type

        Returns:
            List of paths to matching audit records
        """
        if date:
            search_dir = self._get_log_path(date)
            pattern = f"{agent}-*.json" if agent else "*.json"
            return list(search_dir.glob(pattern)) if search_dir.exists() else []

        # Search all dates
        pattern = f"**/{agent}-*.json" if agent else "**/*.json"
        return list(self.audit_dir.glob(pattern))


def create_action(
    action_type: str,
    target: str,
    description: str,
    approved: bool = True,
    result: Optional[str] = None,
    error: Optional[str] = None
) -> AuditAction:
    """Helper to create an audit action."""
    return AuditAction(
        action_id=str(uuid.uuid4()),
        action_type=action_type,
        target=target,
        description=description,
        approved=approved,
        result=result,
        error=error
    )
