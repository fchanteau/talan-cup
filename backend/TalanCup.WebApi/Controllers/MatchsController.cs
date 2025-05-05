using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalanCup.Application.Features.Matchs.Commands.AddMatch;
using TalanCup.Application.Features.Matchs.Commands.DeleteMatch;
using TalanCup.Application.Features.Matchs.Queries.GetMatchs;
using TalanCup.Contracts;
using TalanCup.WebApi.ActionFilters;

namespace TalanCup.WebApi.Controllers;
[Route("api/matchs")]
[ApiController]
[Authorize]
public class MatchsController(
    IMediator mediator) : ApiController
{
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<MatchResponse>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
    [HttpGet]
    public async Task<IActionResult> GetMatchs()
    {
        return await mediator.Send(new GetMatchsQuery(), HttpContext.RequestAborted)
            .Match(response => Ok(response.Matchs.Select(MatchResponse.FromDto)), Problem);
    }

    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
    [HttpPost]
    [ValidateInputModel]
    public async Task<IActionResult> AddMatch([FromBody] AddMatchRequest request)
    {
        return await mediator
            .Send(new AddMatchCommand(request.StartDate, request.EndDate, request.HomePlayerId, request.AwayPlayerId), HttpContext.RequestAborted)
            .Match(response => StatusCode(201), Problem);
    }

    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProblemDetails))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMatch(Guid id) => await mediator
            .Send(new DeleteMatchCommand(id), HttpContext.RequestAborted)
            .Match(response => StatusCode(204), Problem);
}
