using ErrorOr;
using MediatR;
using Microsoft.Extensions.Logging;
using TalanCup.Application.Common;
using TalanCup.Domain;
using TalanCup.Shared.Enums;

namespace TalanCup.Application.Features.Tournaments.Commands;
public record AddTournamentCommand(string Name, long StartDate, MatchDuration MatchDuration) : IRequest<ErrorOr<Success>>;

public class AddTournamentCommandHandler(ITalanCupContext dbContext, ILogger<AddTournamentCommandHandler> logger) : IRequestHandler<AddTournamentCommand, ErrorOr<Success>>
{
    public async Task<ErrorOr<Success>> Handle(AddTournamentCommand request, CancellationToken cancellationToken)
    {
        var tournament = new Tournament
        {
            Name = request.Name,
            StartDate = request.StartDate,
            MatchDuration = request.MatchDuration
        };

        dbContext.Tournaments.Add(tournament);

        var result = await dbContext.SaveChangesAsync(cancellationToken);

        if(result > 0)
        {
            logger.LogInformation("Tournament {TournamentId} added successfully", tournament.TournamentId);
            return Result.Success;
        }
        else
        {
            logger.LogError("Failed to add tournament {TournamentName}", request.Name);
            return Error.Failure("TournamentNotAdded", "The tournament could not be added");
        }
    }
}
