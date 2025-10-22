using MatchHub.Application.DTOs;
using MatchHub.Application.Features.Matches.Commands;
using MatchHub.Application.Features.Matches.Querys;
using MatchHub.Application.Features.Matches.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MatchHub.API.Controllers.V1
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class MatchesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MatchesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get all matches
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetAll()
        {
            var result = await _mediator.Send(new GetAllMatchesQuery());
            return Ok(result);
        }

        /// <summary>
        /// Get match by ID
        /// </summary>
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<MatchDto>> GetById(Guid id)
        {
            var result = await _mediator.Send(new GetMatchByIdQuery(id));
            if (result == null) return NotFound();
            return Ok(result);
        }

        /// <summary>
        /// Create a new match
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<MatchDto>> Create([FromBody] CreateMatchRequest request)
        {
            var command = new CreateMatchCommand(request);
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        /// <summary>
        /// Register match result
        /// </summary>
        [HttpPatch("{id:guid}/result")]
        public async Task<ActionResult<MatchDto>> RegisterResult(Guid id, [FromBody] RegisterResultRequest request)
        {
            if (id != request.MatchId) return BadRequest("Match ID mismatch");

            var command = new RegisterResultCommand(request);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        /// <summary>
        /// Delete a match
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _mediator.Send(new DeleteMatchCommand(id));
            if (!result) return NotFound();
            return NoContent();
        }
    }
}