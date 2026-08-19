using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketingApi.Data;
using TicketingApi.Models;

namespace TicketingApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]                          // all endpoints require a valid JWT by default
public class TicketsController : ControllerBase
{
    private readonly AppDbContext _db;

    public TicketsController(AppDbContext db)
    {
        _db = db;
    }

    // GET api/tickets — all authenticated users can list tickets
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tickets = await _db.Tickets
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
        return Ok(tickets);
    }

    // GET api/tickets/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ticket = await _db.Tickets.FindAsync(id);
        if (ticket is null) return NotFound();
        return Ok(ticket);
    }

    // POST api/tickets — any logged-in user can create a ticket
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Ticket ticket)
    {
        ticket.Id = 0;
        ticket.CreatedAt = DateTime.UtcNow;
        ticket.Status = "Open";

        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = ticket.Id }, ticket);
    }

    // PUT api/tickets/5 — only Agent or Admin can update
    [HttpPut("{id}")]
    [Authorize(Roles = "Agent,Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] Ticket updated)
    {
        var ticket = await _db.Tickets.FindAsync(id);
        if (ticket is null) return NotFound();

        ticket.Title       = updated.Title;
        ticket.Description = updated.Description;
        ticket.Status      = updated.Status;
        ticket.Priority    = updated.Priority;
        ticket.Category    = updated.Category;
        ticket.UpdatedAt   = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(ticket);
    }

    // DELETE api/tickets/5 — only Admin can delete
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var ticket = await _db.Tickets.FindAsync(id);
        if (ticket is null) return NotFound();

        _db.Tickets.Remove(ticket);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
