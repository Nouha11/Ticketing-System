namespace TicketingApi.Models;

// ── Request DTOs ──────────────────────────────────────────────────────────────

public record RegisterRequest(string FullName, string Email, string Password, string Role = "User");

public record LoginRequest(string Email, string Password);

// ── Response DTOs ─────────────────────────────────────────────────────────────

public record AuthResponse(string Token, string Role, string FullName);
