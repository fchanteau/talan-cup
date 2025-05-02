using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TalanCup.Application.Features.Matchs.Commands.AddMatch;
using TalanCup.Application.Features.Matchs.Queries.GetMatchs;
using TalanCup.Contracts;

namespace TalanCup.WebApi.Controllers;
[Route("api/matchs")]
[ApiController]
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
    public async Task<IActionResult> AddMatch([FromBody] AddMatchRequest request)
    {
        return await mediator
            .Send(new AddMatchCommand(request.StartDate, request.EndDate, request.HomePlayerId, request.AwayPlayerId), HttpContext.RequestAborted)
            .Match(response => StatusCode(201), Problem);
    }
}
