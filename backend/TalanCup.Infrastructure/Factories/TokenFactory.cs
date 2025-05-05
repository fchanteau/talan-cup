using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TalanCup.Application.Common;
using TalanCup.Shared.Authentication;
using TalanCup.Shared.Options;

namespace TalanCup.Infrastructure.Factories;

public class TokenFactory(IOptions<JwtOptions> jwtOptions, IDateTimeProvider dateTimeProvider) : ITokenFactory
{
    private readonly JwtOptions _jwtOptions = jwtOptions.Value;

    public string CreateToken(Guid playerId)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(_jwtOptions.Issuer,
                                         _jwtOptions.Audience,
                                         expires: dateTimeProvider.UtcNow.AddMinutes(60),
                                         signingCredentials: credentials);

        token.Payload.AddClaim(new Claim(TalanCupClaimTypes.PlayerId, playerId.ToString()));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}