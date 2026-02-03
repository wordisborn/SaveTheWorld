"""
Claude API client wrapper for SaveTheWorld agents.

Handles:
- API authentication
- Token counting and budget tracking
- Structured tool use
- Error handling and retries
"""

import os
import json
from typing import Optional
from dataclasses import dataclass


@dataclass
class TokenUsage:
    """Track token usage for a single API call."""
    input_tokens: int
    output_tokens: int

    @property
    def total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens


@dataclass
class AgentResponse:
    """Response from an agent invocation."""
    content: str
    tool_calls: list
    usage: TokenUsage
    stop_reason: str


class ClaudeClient:
    """Wrapper for Claude API with budget tracking."""

    def __init__(self, api_key: Optional[str] = None, mock_mode: bool = False):
        """
        Initialize the Claude client.

        Args:
            api_key: Anthropic API key. If None, reads from CLAUDE_API_KEY env var.
            mock_mode: If True, return mock responses instead of calling API.
        """
        self.api_key = api_key or os.environ.get("CLAUDE_API_KEY")
        self.mock_mode = mock_mode
        self._client = None

        if not self.mock_mode and not self.api_key:
            raise ValueError("CLAUDE_API_KEY not set and mock_mode is False")

    def _get_client(self):
        """Lazy initialization of Anthropic client."""
        if self._client is None and not self.mock_mode:
            try:
                import anthropic
                self._client = anthropic.Anthropic(api_key=self.api_key)
            except ImportError:
                raise ImportError("anthropic package not installed. Run: pip install anthropic")
        return self._client

    def invoke_agent(
        self,
        agent_identity: str,
        context: str,
        system_prompt: str,
        max_tokens: int = 4096,
        tools: Optional[list] = None
    ) -> AgentResponse:
        """
        Invoke an agent with the given identity and context.

        Args:
            agent_identity: The agent's identity/role description
            context: Current context (files, state, etc.)
            system_prompt: System instructions for the agent
            max_tokens: Maximum tokens to generate
            tools: Optional list of tools the agent can use

        Returns:
            AgentResponse with content, tool calls, and usage stats
        """
        if self.mock_mode:
            return self._mock_response(agent_identity)

        client = self._get_client()

        messages = [
            {
                "role": "user",
                "content": f"{context}\n\n---\n\nProceed with your task."
            }
        ]

        kwargs = {
            "model": "claude-sonnet-4-20250514",
            "max_tokens": max_tokens,
            "system": f"{system_prompt}\n\n---\n\n{agent_identity}",
            "messages": messages
        }

        if tools:
            kwargs["tools"] = tools

        response = client.messages.create(**kwargs)

        # Extract content and tool calls
        content_parts = []
        tool_calls = []

        for block in response.content:
            if block.type == "text":
                content_parts.append(block.text)
            elif block.type == "tool_use":
                tool_calls.append({
                    "id": block.id,
                    "name": block.name,
                    "input": block.input
                })

        return AgentResponse(
            content="\n".join(content_parts),
            tool_calls=tool_calls,
            usage=TokenUsage(
                input_tokens=response.usage.input_tokens,
                output_tokens=response.usage.output_tokens
            ),
            stop_reason=response.stop_reason
        )

    def _mock_response(self, agent_identity: str) -> AgentResponse:
        """Return a mock response for testing."""
        return AgentResponse(
            content=f"[MOCK] Agent response for: {agent_identity[:50]}...",
            tool_calls=[],
            usage=TokenUsage(input_tokens=1000, output_tokens=500),
            stop_reason="end_turn"
        )


def load_mock_fixtures(fixtures_dir: str) -> dict:
    """Load mock response fixtures from a directory."""
    fixtures = {}
    if os.path.exists(fixtures_dir):
        for filename in os.listdir(fixtures_dir):
            if filename.endswith(".json"):
                with open(os.path.join(fixtures_dir, filename)) as f:
                    fixtures[filename[:-5]] = json.load(f)
    return fixtures
