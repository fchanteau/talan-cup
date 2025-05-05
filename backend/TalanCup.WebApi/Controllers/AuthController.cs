using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalanCup.Application.Features.Auth.Commands.Login;
using TalanCup.Contracts;

namespace TalanCup.WebApi.Controllers;
[Route("api/auth")]
[ApiController]
[AllowAnonymous]
public class AuthController(IMediator mediator) : ApiController
{
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ProblemDetails))]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        return await mediator
            .Send(new LoginCommand(request.Login), HttpContext.RequestAborted)
            .Match(
                result => Ok(new LoginResponse(result.PlayerId, result.Token)),
                Problem);
    }
}
