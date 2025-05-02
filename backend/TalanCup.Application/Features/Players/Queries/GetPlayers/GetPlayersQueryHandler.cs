using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;
using TalanCup.Application.Features.Players.Dto;

namespace TalanCup.Application.Features.Players.Queries.GetPlayers;

public record GetPlayersQuery() : IRequest<ErrorOr<GetPlayersResponse>>;

public record GetPlayersResponse(List<PlayerDto> Players);

internal class GetPlayersQueryHandler(ITalanCupContext dbContext) : IRequestHandler<GetPlayersQuery, ErrorOr<GetPlayersResponse>>
{
    public async Task<ErrorOr<GetPlayersResponse>> Handle(GetPlayersQuery request, CancellationToken cancellationToken)
    {
        var players = await dbContext.Players.Select(p => PlayerDto.FromPlayer(p))
            .ToListAsync(cancellationToken);

        return new GetPlayersResponse(players).ToErrorOr();
    }
}
