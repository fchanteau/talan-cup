using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;
using TalanCup.Domain;

namespace TalanCup.Application.Features.Matchs.Commands.DeleteMatch;
public record DeleteMatchCommand(Guid MatchId) : IRequest<ErrorOr<Success>>;

public class DeleteMatchCommandHandler(ITalanCupContext dbContext, ICurrentUserProvider currentUserProvider) : IRequestHandler<DeleteMatchCommand, ErrorOr<Success>>
{
    public async Task<ErrorOr<Success>> Handle(DeleteMatchCommand request, CancellationToken cancellationToken)
    {
        return await GetMatchAsync(request.MatchId, cancellationToken)
            .Then(match => CanCurrentUserDelete(match, cancellationToken))
            .ThenAsync(match => DeleteMatchAsync(match, cancellationToken));

    }

    private async Task<ErrorOr<Match>> GetMatchAsync(Guid matchId, CancellationToken cancellationToken)
    {
        var match = await dbContext.Matchs.FirstOrDefaultAsync(m => m.MatchId == matchId, cancellationToken);
        if(match is null)
        {
            return Error.Failure("MatchNotFound", "Match not found");
        }

        return match;
    }

    private ErrorOr<Match> CanCurrentUserDelete(Match match, CancellationToken cancellationToken)
    {
        var user = currentUserProvider.GetCurrentPlayerId();
        if(match.HomePlayerId != user && match.AwayPlayerId != user)
        {
            return Error.Forbidden("Forbidden", "You are not authorized to delete this match");
        }
        return match;
    }

    private async Task<ErrorOr<Success>> DeleteMatchAsync(Match match, CancellationToken cancellationToken)
    {
        dbContext.Matchs.Remove(match);
        var result = await dbContext.SaveChangesAsync(cancellationToken);
        return result > 0 ? Result.Success : Error.Failure("MatchNotDeleted", "The match could not be deleted");
    }
}
