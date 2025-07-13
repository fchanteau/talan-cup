using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;
using TalanCup.Application.Features.Tournaments.Dto;

namespace TalanCup.Application.Features.Tournaments.Queries;
public record GetUserTournamentsQuery(Guid UserId) : IRequest<ErrorOr<GetUserTournamentsResponse>>;

public record GetUserTournamentsResponse(List<TournamentDto> Tournaments);

public class GetUserTournamentsQueryHandler(ITalanCupContext dbContext, ICurrentUserProvider currentUserProvider) : IRequestHandler<GetUserTournamentsQuery, ErrorOr<GetUserTournamentsResponse>>
{
    public async Task<ErrorOr<GetUserTournamentsResponse>> Handle(GetUserTournamentsQuery request, CancellationToken cancellationToken)
    {
        return await currentUserProvider.GetCurrentPlayerId()
            .Then(currentUserId => UserCanAccessResource(currentUserId, request.UserId))
            .ThenAsync(_ => GetTournamentsForUserAsync(request.UserId, cancellationToken));
    }

    private ErrorOr<Success> UserCanAccessResource(Guid currentUserId, Guid userId)
    {
        if(currentUserId != userId)
        {
            return Error.Unauthorized("Unauthorized", "Vous n'avez pas la permission d'accéder à cette ressource.");
        }

        return Result.Success;
    }

    private async Task<ErrorOr<GetUserTournamentsResponse>> GetTournamentsForUserAsync(Guid userId, CancellationToken cancellationToken)
    {
        var player = await dbContext.Players
            .AsNoTracking()
            .Include(p => p.Tournaments)
            .FirstOrDefaultAsync(p => p.PlayerId == userId, cancellationToken);

        if(player is null)
        {
            return Error.Failure("UserNotFound", "L'utilisateur n'existe pas.");
        }

        var tournaments = player.Tournaments
            .Select(t => new TournamentDto
            {
                TournamentId = t.TournamentId,
                Name = t.Name,
                StartDate = t.StartDate
            })
            .ToList();

        return new GetUserTournamentsResponse(tournaments);
    }
}