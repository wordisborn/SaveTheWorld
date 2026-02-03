"""
Cost tracking for SaveTheWorld agents.

Tracks token usage against budget limits defined in config/limits.yaml.
All limits are percentage-based, adapting to whatever API plan is available.
"""

import json
import os
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Optional
from dataclasses import dataclass, asdict
import yaml


@dataclass
class UsageRecord:
    """Record of token usage for a single run."""
    run_id: str
    agent: str
    timestamp: str
    input_tokens: int
    output_tokens: int

    @property
    def total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens


@dataclass
class BudgetStatus:
    """Current budget status."""
    monthly_budget_tokens: int
    monthly_used_tokens: int
    monthly_remaining_tokens: int
    monthly_used_percent: float
    daily_used_tokens: int
    daily_used_percent: float
    weekly_used_tokens: int
    weekly_used_percent: float
    should_pause: bool
    alerts: list


class CostTracker:
    """Track token usage against budget limits."""

    def __init__(
        self,
        config_path: str = "config/limits.yaml",
        data_path: str = "audit/cost-tracking.json"
    ):
        """
        Initialize the cost tracker.

        Args:
            config_path: Path to limits configuration
            data_path: Path to usage data file
        """
        self.config_path = Path(config_path)
        self.data_path = Path(data_path)
        self._config = None
        self._data = None

    @property
    def config(self) -> dict:
        """Load configuration lazily."""
        if self._config is None:
            if self.config_path.exists():
                with open(self.config_path) as f:
                    self._config = yaml.safe_load(f)
            else:
                self._config = self._default_config()
        return self._config

    @property
    def data(self) -> dict:
        """Load usage data lazily."""
        if self._data is None:
            if self.data_path.exists():
                with open(self.data_path) as f:
                    self._data = json.load(f)
            else:
                self._data = {"runs": [], "monthly_budget_tokens": 0}
        return self._data

    def _default_config(self) -> dict:
        """Default configuration if file not found."""
        return {
            "budget": {
                "monthly_allocation_percent": 25,
                "alert_at_percent": [50, 75, 90],
                "pause_at_percent": 95
            },
            "limits": {
                "per_run_max_percent": 2,
                "daily_max_percent": 5,
                "weekly_max_percent": 30
            }
        }

    def set_monthly_budget(self, tokens: int):
        """
        Set the monthly token budget.

        This should be called with the actual token limit from your API plan,
        adjusted by the monthly_allocation_percent from config.

        Args:
            tokens: Total tokens available for this system per month
        """
        self.data["monthly_budget_tokens"] = tokens
        self._save_data()

    def log_usage(self, run_id: str, agent: str, input_tokens: int, output_tokens: int):
        """
        Log token usage for a run.

        Args:
            run_id: Unique run identifier
            agent: Agent type
            input_tokens: Input tokens used
            output_tokens: Output tokens used
        """
        record = UsageRecord(
            run_id=run_id,
            agent=agent,
            timestamp=datetime.now(timezone.utc).isoformat(),
            input_tokens=input_tokens,
            output_tokens=output_tokens
        )

        self.data["runs"].append(asdict(record))
        self._save_data()

    def get_status(self) -> BudgetStatus:
        """
        Get current budget status.

        Returns:
            BudgetStatus with current usage and alerts
        """
        now = datetime.now(timezone.utc)
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        week_start = now - timedelta(days=now.weekday())
        day_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

        monthly_tokens = 0
        weekly_tokens = 0
        daily_tokens = 0

        for run in self.data["runs"]:
            run_time = datetime.fromisoformat(run["timestamp"].replace("Z", "+00:00"))
            total = run["input_tokens"] + run["output_tokens"]

            if run_time >= month_start:
                monthly_tokens += total
            if run_time >= week_start:
                weekly_tokens += total
            if run_time >= day_start:
                daily_tokens += total

        budget = self.data.get("monthly_budget_tokens", 0)
        if budget == 0:
            # No budget set yet
            return BudgetStatus(
                monthly_budget_tokens=0,
                monthly_used_tokens=monthly_tokens,
                monthly_remaining_tokens=0,
                monthly_used_percent=0,
                daily_used_tokens=daily_tokens,
                daily_used_percent=0,
                weekly_used_tokens=weekly_tokens,
                weekly_used_percent=0,
                should_pause=False,
                alerts=["Monthly budget not set. Call set_monthly_budget() first."]
            )

        monthly_percent = (monthly_tokens / budget) * 100
        daily_percent = (daily_tokens / budget) * 100
        weekly_percent = (weekly_tokens / budget) * 100

        # Check limits
        limits = self.config.get("limits", {})
        budget_config = self.config.get("budget", {})

        alerts = []
        should_pause = False

        # Check alert thresholds
        for threshold in budget_config.get("alert_at_percent", []):
            if monthly_percent >= threshold:
                alerts.append(f"Monthly usage at {monthly_percent:.1f}% (threshold: {threshold}%)")

        # Check pause threshold
        pause_at = budget_config.get("pause_at_percent", 95)
        if monthly_percent >= pause_at:
            should_pause = True
            alerts.append(f"PAUSE: Monthly usage at {monthly_percent:.1f}% exceeds {pause_at}%")

        # Check daily limit
        daily_max = limits.get("daily_max_percent", 5)
        if daily_percent >= daily_max:
            should_pause = True
            alerts.append(f"PAUSE: Daily usage at {daily_percent:.1f}% exceeds {daily_max}%")

        # Check weekly limit
        weekly_max = limits.get("weekly_max_percent", 30)
        if weekly_percent >= weekly_max:
            should_pause = True
            alerts.append(f"PAUSE: Weekly usage at {weekly_percent:.1f}% exceeds {weekly_max}%")

        return BudgetStatus(
            monthly_budget_tokens=budget,
            monthly_used_tokens=monthly_tokens,
            monthly_remaining_tokens=budget - monthly_tokens,
            monthly_used_percent=monthly_percent,
            daily_used_tokens=daily_tokens,
            daily_used_percent=daily_percent,
            weekly_used_tokens=weekly_tokens,
            weekly_used_percent=weekly_percent,
            should_pause=should_pause,
            alerts=alerts
        )

    def check_run_budget(self, estimated_tokens: int) -> tuple[bool, str]:
        """
        Check if a run is within budget.

        Args:
            estimated_tokens: Estimated tokens for the run

        Returns:
            (allowed, reason) tuple
        """
        status = self.get_status()

        if status.should_pause:
            return False, f"Budget exceeded: {'; '.join(status.alerts)}"

        budget = status.monthly_budget_tokens
        if budget == 0:
            return True, "No budget set, allowing run"

        per_run_max = self.config.get("limits", {}).get("per_run_max_percent", 2)
        max_tokens = (budget * per_run_max) / 100

        if estimated_tokens > max_tokens:
            return False, f"Run exceeds per-run limit ({estimated_tokens} > {max_tokens:.0f})"

        return True, "Within budget"

    def _save_data(self):
        """Save usage data to disk."""
        self.data_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.data_path, "w") as f:
            json.dump(self.data, f, indent=2)
