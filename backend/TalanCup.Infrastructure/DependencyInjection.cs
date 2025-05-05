using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using TalanCup.Infrastructure.Database;
using TalanCup.Infrastructure.Factories;
using TalanCup.Infrastructure.Providers;

namespace TalanCup.Infrastructure;
public static class DependencyInjection
{
    public static void AddInfrastructure(this IHostApplicationBuilder builder, IConfiguration configuration)
    {
        builder.AddDatabase(configuration);
        builder.AddFactories();
        builder.AddProviders();
    }

    public static async Task UseInfrastructureAsync(this IHost host, CancellationToken cancellationToken = default)
    {
        await host.UseDatabaseAsync(cancellationToken);
    }
}
