using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;

namespace TalanCup.Application.Features.Auth.Commands.Login;

public record LoginCommand(string Login) : IRequest<ErrorOr<LoginCommandResult>>;

public record LoginCommandResult(Guid PlayerId, string Token);

public class LoginCommandHandler(ITalanCupContext dbContext, ITokenFactory tokenFactory) : IRequestHandler<LoginCommand, ErrorOr<LoginCommandResult>>
{
    public async Task<ErrorOr<LoginCommandResult>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await dbContext.Players.FirstOrDefaultAsync(p => request.Login.ToLower() == $"{p.NameTag.ToLower()}#{p.Team.ToLower().Substring(0, 3)}", cancellationToken);
        if(user is null)
        {
            return Error.Failure("UserNotFound", "User not found");
        }

        var token = tokenFactory.CreateToken(user.PlayerId);

        return new LoginCommandResult(user.PlayerId, token);
    }
}
