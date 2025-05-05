using ErrorOr;

namespace TalanCup.Application.Common;
public interface ICurrentUserProvider
{
    ErrorOr<Guid> GetCurrentPlayerId();
}
