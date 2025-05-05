using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalanCup.Application.Features.Players.Queries.GetPlayers;
using TalanCup.Contracts;

namespace TalanCup.WebApi.Controllers;
[Route("api/players")]
[ApiController]
[Authorize]
public class PlayersController(IMediator mediator) : ApiController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<PlayerResponse>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
    public async Task<IActionResult> GetPlayers()
    {
        return await mediator.Send(new GetPlayersQuery(), HttpContext.RequestAborted)
            .Match(response => Ok(response.Players.Select(PlayerResponse.FromDto)), Problem);
    }
}
