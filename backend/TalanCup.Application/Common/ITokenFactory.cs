namespace TalanCup.Application.Common;
public interface ITokenFactory
{
    string CreateToken(Guid playerId);
}
