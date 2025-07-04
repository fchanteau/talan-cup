using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalanCup.Application.Features.Tournaments.Commands;
using TalanCup.Contracts;
using TalanCup.WebApi.ActionFilters;

namespace TalanCup.WebApi.Controllers;
[Route("api/tournaments")]
[ApiController]
[Authorize]
public class TournamentsController(IMediator mediator) : ApiController
{
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
    [HttpPost]
    [ValidateInputModel]
    public async Task<IActionResult> AddTournament([FromBody] AddTournamentRequest request)
    {
        return await mediator
            .Send(new AddTournamentCommand(request.Name, request.StartDate, request.MatchDuration), HttpContext.RequestAborted)
            .Match(response => StatusCode(201), Problem);
    }
}
