using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;
using TalanCup.Domain;

namespace TalanCup.Application.Features.Matchs.Commands.AddMatch;
public record AddMatchCommand(long StartDate, long EndDate, Guid HomePlayerId, Guid AwayPlayerId) : IRequest<ErrorOr<Success>>;

public class AddMatchCommandHandler(ITalanCupContext dbContext) : IRequestHandler<AddMatchCommand, ErrorOr<Success>>
{
    public async Task<ErrorOr<Success>> Handle(AddMatchCommand request, CancellationToken cancellationToken)
    {
        // Check if creneau available
        return await IsSlotAvailableAsync(request.StartDate, cancellationToken)
            .ThenAsync(_ => IsPlayersExistsAsync(request.HomePlayerId, request.AwayPlayerId, cancellationToken))
            .ThenAsync(_ => AddMatchAsync(request, cancellationToken));

    }

    private async Task<ErrorOr<Success>> IsSlotAvailableAsync(long startDate, CancellationToken cancellationToken)
    {
        var isAvailable = !await
            dbContext.Matchs.AnyAsync(m => m.StartDate == startDate);

        return isAvailable ? Result.Success : Error.Failure("MatchAlreadyExists", "A match already exists at this time");
    }

    private async Task<ErrorOr<Success>> IsPlayersExistsAsync(Guid homePlayerId, Guid awayPlayerId, CancellationToken cancellationToken)
    {
        var playersCount = await dbContext.Players
            .CountAsync(p => p.PlayerId == homePlayerId || p.PlayerId == awayPlayerId, cancellationToken);

        return playersCount == 2 ? Result.Success : Error.Failure("PlayerNotFound", "One of the players does not exist");
    }

    private async Task<ErrorOr<Success>> AddMatchAsync(AddMatchCommand command, CancellationToken cancellationToken)
    {
        var match = new Match
        {
            StartDate = command.StartDate,
            EndDate = command.EndDate,
            HomePlayerId = command.HomePlayerId,
            AwayPlayerId = command.AwayPlayerId,
        };

        dbContext.Matchs.Add(match);

        var result = await dbContext.SaveChangesAsync(cancellationToken);

        return result > 0 ? Result.Success : Error.Failure("MatchNotAdded", "The match could not be added");
    }
}
