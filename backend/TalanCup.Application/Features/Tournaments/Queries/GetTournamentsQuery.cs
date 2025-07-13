using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;
using TalanCup.Application.Features.Tournaments.Dto;

namespace TalanCup.Application.Features.Tournaments.Queries;
public record GetTournamentsQuery() : IRequest<ErrorOr<GetTournamentsResponse>>;

public record GetTournamentsResponse(IEnumerable<TournamentDto> Tournaments);

public record class GetTournamentsQueryHandler(ITalanCupContext dbContext) : IRequestHandler<GetTournamentsQuery, ErrorOr<GetTournamentsResponse>>
{
    public async Task<ErrorOr<GetTournamentsResponse>> Handle(GetTournamentsQuery request, CancellationToken cancellationToken)
    {
        var tournaments = await dbContext.Tournaments.ToListAsync(cancellationToken);
        var tournamentDtos = tournaments.Select(t => new TournamentDto
        {
            TournamentId = t.TournamentId,
            Name = t.Name,
            StartDate = t.StartDate
        }).ToList();
        return new GetTournamentsResponse(tournamentDtos);
    }
}
