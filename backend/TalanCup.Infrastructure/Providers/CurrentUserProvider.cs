using ErrorOr;
using Microsoft.AspNetCore.Http;
using TalanCup.Application.Common;
using TalanCup.Shared.Authentication;

namespace TalanCup.Infrastructure.Providers;
public class CurrentUserProvider(IHttpContextAccessor httpContextAccessor) : ICurrentUserProvider
{
    public ErrorOr<Guid> GetCurrentPlayerId()
    {
        var playerIdClaim = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(x => x.Type.Equals(TalanCupClaimTypes.PlayerId));

        if(Guid.TryParse(playerIdClaim?.Value, out var playerId))
        {
            return playerId;
        }

        return Error.Failure("ClaimsNotFound");
    }
}
