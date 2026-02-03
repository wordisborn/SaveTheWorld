"""
Git operations for SaveTheWorld agents.

Handles:
- Committing changes with proper attribution
- Branch management
- Conflict detection
"""

import subprocess
import os
from typing import Optional, List
from dataclasses import dataclass


@dataclass
class GitResult:
    """Result of a git operation."""
    success: bool
    output: str
    error: Optional[str] = None


class GitOps:
    """Git operations wrapper."""

    BOT_NAME = "SaveTheWorld Bot"
    BOT_EMAIL = "bot@savetheworld.local"

    def __init__(self, repo_path: Optional[str] = None):
        """
        Initialize git operations.

        Args:
            repo_path: Path to the git repository. Defaults to current directory.
        """
        self.repo_path = repo_path or os.getcwd()

    def _run(self, *args: str) -> GitResult:
        """Run a git command and return the result."""
        try:
            result = subprocess.run(
                ["git"] + list(args),
                cwd=self.repo_path,
                capture_output=True,
                text=True
            )
            return GitResult(
                success=result.returncode == 0,
                output=result.stdout.strip(),
                error=result.stderr.strip() if result.returncode != 0 else None
            )
        except Exception as e:
            return GitResult(success=False, output="", error=str(e))

    def configure_bot(self) -> GitResult:
        """Configure git user for bot commits."""
        name_result = self._run("config", "user.name", self.BOT_NAME)
        if not name_result.success:
            return name_result

        return self._run("config", "user.email", self.BOT_EMAIL)

    def status(self) -> GitResult:
        """Get git status."""
        return self._run("status", "--porcelain")

    def has_changes(self) -> bool:
        """Check if there are uncommitted changes."""
        result = self.status()
        return bool(result.output)

    def add(self, *paths: str) -> GitResult:
        """Stage files for commit."""
        if not paths:
            return self._run("add", "-A")
        return self._run("add", *paths)

    def commit(self, message: str, agent_name: str = "Unknown Agent") -> GitResult:
        """
        Create a commit with proper attribution.

        Args:
            message: Commit message
            agent_name: Name of the agent making the commit

        Returns:
            GitResult with commit SHA on success
        """
        # Add co-author trailer
        full_message = f"{message}\n\nCo-Authored-By: {agent_name} <{self.BOT_EMAIL}>"

        result = self._run("commit", "-m", full_message)
        if result.success:
            sha_result = self._run("rev-parse", "HEAD")
            result.output = sha_result.output
        return result

    def push(self, remote: str = "origin", branch: Optional[str] = None) -> GitResult:
        """Push commits to remote."""
        args = ["push", remote]
        if branch:
            args.append(branch)
        return self._run(*args)

    def pull(self, remote: str = "origin", branch: Optional[str] = None) -> GitResult:
        """Pull changes from remote."""
        args = ["pull", remote]
        if branch:
            args.append(branch)
        return self._run(*args)

    def current_branch(self) -> str:
        """Get the current branch name."""
        result = self._run("rev-parse", "--abbrev-ref", "HEAD")
        return result.output if result.success else "unknown"

    def diff(self, *paths: str) -> GitResult:
        """Get diff of changes."""
        args = ["diff"]
        if paths:
            args.extend(paths)
        return self._run(*args)

    def log(self, count: int = 5) -> GitResult:
        """Get recent commit log."""
        return self._run("log", f"-{count}", "--oneline")

    def check_conflicts(self) -> List[str]:
        """Check for merge conflict markers in tracked files."""
        result = self._run("diff", "--check")
        if result.error and "conflict" in result.error.lower():
            return result.error.split("\n")
        return []
