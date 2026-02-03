"""
Ethical boundary checker for SaveTheWorld agents.

Enforces hard constraints that cannot be overridden by any agent.
When uncertainty arises, stops and escalates to human review.
"""

import re
from typing import Optional
from dataclasses import dataclass
from enum import Enum


class ActionCategory(Enum):
    """Categories of actions."""
    ALLOWED = "allowed"
    REQUIRES_HUMAN = "requires_human"
    FORBIDDEN = "forbidden"


@dataclass
class EthicsCheck:
    """Result of an ethics check."""
    allowed: bool
    category: ActionCategory
    reason: str
    escalate: bool = False


# Actions that always require human approval
REQUIRES_HUMAN_APPROVAL = {
    "external_api_call",
    "send_email",
    "send_message",
    "create_external_issue",
    "publish_package",
    "financial_transaction",
    "modify_ci_cd",
    "access_external_database",
    "create_social_post",
    "modify_permissions",
}

# Domains that are completely forbidden
FORBIDDEN_DOMAINS = {
    "weapons",
    "violence",
    "harassment",
    "illegal",
    "manipulation",
    "deception",
    "surveillance",
    "pii_collection",
    "exploit",
    "malware",
}

# Patterns that suggest forbidden content
FORBIDDEN_PATTERNS = [
    r"\b(hack|exploit|vulnerability|attack)\b.*\b(system|server|database)\b",
    r"\b(steal|exfiltrate|harvest)\b.*\b(data|credentials|password)\b",
    r"\b(spam|phish|scam)\b",
    r"\b(kill|harm|injure)\b.*\b(person|people|human)\b",
]


class EthicsChecker:
    """Check actions and content against ethical boundaries."""

    def __init__(self, additional_forbidden: Optional[set] = None):
        """
        Initialize the ethics checker.

        Args:
            additional_forbidden: Additional forbidden domains to check
        """
        self.forbidden_domains = FORBIDDEN_DOMAINS.copy()
        if additional_forbidden:
            self.forbidden_domains.update(additional_forbidden)

        self.forbidden_patterns = [re.compile(p, re.IGNORECASE) for p in FORBIDDEN_PATTERNS]

    def check_action(self, action_type: str, target: str = "", context: str = "") -> EthicsCheck:
        """
        Check if an action is allowed.

        Args:
            action_type: Type of action (e.g., "file_write", "external_api_call")
            target: Target of the action (e.g., file path, URL)
            context: Additional context about the action

        Returns:
            EthicsCheck result
        """
        # Check if action requires human approval
        if action_type in REQUIRES_HUMAN_APPROVAL:
            return EthicsCheck(
                allowed=False,
                category=ActionCategory.REQUIRES_HUMAN,
                reason=f"Action '{action_type}' requires human approval",
                escalate=True
            )

        # Check target and context for forbidden content
        combined = f"{target} {context}".lower()

        for domain in self.forbidden_domains:
            if domain in combined:
                return EthicsCheck(
                    allowed=False,
                    category=ActionCategory.FORBIDDEN,
                    reason=f"Content touches forbidden domain: {domain}",
                    escalate=True
                )

        for pattern in self.forbidden_patterns:
            if pattern.search(combined):
                return EthicsCheck(
                    allowed=False,
                    category=ActionCategory.FORBIDDEN,
                    reason=f"Content matches forbidden pattern",
                    escalate=True
                )

        return EthicsCheck(
            allowed=True,
            category=ActionCategory.ALLOWED,
            reason="Action permitted"
        )

    def check_content(self, content: str) -> EthicsCheck:
        """
        Check if content is appropriate.

        Args:
            content: Content to check

        Returns:
            EthicsCheck result
        """
        content_lower = content.lower()

        # Check forbidden domains
        for domain in self.forbidden_domains:
            if domain in content_lower:
                return EthicsCheck(
                    allowed=False,
                    category=ActionCategory.FORBIDDEN,
                    reason=f"Content touches forbidden domain: {domain}",
                    escalate=True
                )

        # Check forbidden patterns
        for pattern in self.forbidden_patterns:
            if pattern.search(content):
                return EthicsCheck(
                    allowed=False,
                    category=ActionCategory.FORBIDDEN,
                    reason="Content matches forbidden pattern",
                    escalate=True
                )

        return EthicsCheck(
            allowed=True,
            category=ActionCategory.ALLOWED,
            reason="Content permitted"
        )

    def check_file_target(self, file_path: str) -> EthicsCheck:
        """
        Check if writing to a file path is allowed.

        Args:
            file_path: Path to check

        Returns:
            EthicsCheck result
        """
        # Prevent writing outside repository
        if file_path.startswith("/") and not file_path.startswith(("/Users/", "/home/")):
            return EthicsCheck(
                allowed=False,
                category=ActionCategory.FORBIDDEN,
                reason="Cannot write to system paths",
                escalate=True
            )

        # Prevent modifying CI/CD without approval
        if ".github/workflows" in file_path or ".gitlab-ci" in file_path:
            return EthicsCheck(
                allowed=False,
                category=ActionCategory.REQUIRES_HUMAN,
                reason="Modifying CI/CD requires human approval",
                escalate=True
            )

        # Prevent modifying secrets or credentials
        sensitive_patterns = [
            r"\.env",
            r"credentials",
            r"secrets?\.ya?ml",
            r"api[_-]?key",
            r"password",
            r"token",
        ]
        for pattern in sensitive_patterns:
            if re.search(pattern, file_path, re.IGNORECASE):
                return EthicsCheck(
                    allowed=False,
                    category=ActionCategory.REQUIRES_HUMAN,
                    reason="Modifying sensitive files requires human approval",
                    escalate=True
                )

        return EthicsCheck(
            allowed=True,
            category=ActionCategory.ALLOWED,
            reason="File path permitted"
        )


def check_all(
    action_type: str,
    target: str = "",
    content: str = "",
    checker: Optional[EthicsChecker] = None
) -> EthicsCheck:
    """
    Convenience function to check action, target, and content.

    Args:
        action_type: Type of action
        target: Target of action
        content: Content being written/sent
        checker: Optional custom checker

    Returns:
        EthicsCheck result (returns first failure or success if all pass)
    """
    checker = checker or EthicsChecker()

    # Check action type
    result = checker.check_action(action_type, target, content)
    if not result.allowed:
        return result

    # Check file target if applicable
    if action_type in ("file_write", "file_create", "file_modify"):
        result = checker.check_file_target(target)
        if not result.allowed:
            return result

    # Check content
    if content:
        result = checker.check_content(content)
        if not result.allowed:
            return result

    return EthicsCheck(
        allowed=True,
        category=ActionCategory.ALLOWED,
        reason="All checks passed"
    )
