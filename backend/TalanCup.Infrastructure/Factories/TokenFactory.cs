using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TalanCup.Application.Common;
using TalanCup.Shared.Authentication;
using TalanCup.Shared.Options;

namespace TalanCup.Infrastructure.Factories;

public class TokenFactory(IOptions<JwtOptions> jwtOptions, IDateTimeProvider dateTimeProvider, ILogger<TokenFactory> logger) : ITokenFactory
{
    private readonly JwtOptions _jwtOptions = jwtOptions.Value;

    public string CreateToken(Guid playerId)
    {
        logger.LogInformation("Creating JWT token for player with ID {PlayerId}", playerId);
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(_jwtOptions.Issuer,
                                         _jwtOptions.Audience,
                                         expires: dateTimeProvider.UtcNow.AddDays(1),
                                         signingCredentials: credentials);

        token.Payload.AddClaim(new Claim(TalanCupClaimTypes.PlayerId, playerId.ToString()));

        logger.LogInformation("JWT token created for player with ID {PlayerId}", playerId);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}