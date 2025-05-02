using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;
using TalanCup.Application.Features.Matchs.Dto;

namespace TalanCup.Application.Features.Matchs.Queries.GetMatchs;

public record GetMatchsQuery() : IRequest<ErrorOr<GetMatchsResponse>>;

public record GetMatchsResponse(IEnumerable<MatchDto> Matchs);

public class GetMatchsQueryHandler(ITalanCupContext dbContext) : IRequestHandler<GetMatchsQuery, ErrorOr<GetMatchsResponse>>
{
    public async Task<ErrorOr<GetMatchsResponse>> Handle(GetMatchsQuery request, CancellationToken cancellationToken)
    {
        var matchs = await dbContext.Matchs
            .Select(m => MatchDto.FromMatch(m))
            .ToListAsync(cancellationToken);

        return new GetMatchsResponse(matchs).ToErrorOr();
    }
}
