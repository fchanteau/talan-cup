using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TalanCup.Application.Common;

namespace TalanCup.Infrastructure.Factories;
public static class DependencyInjection
{
    public static void AddFactories(this IHostApplicationBuilder builder)
    {
        builder.Services.AddScoped<ITokenFactory, TokenFactory>();
    }
}
