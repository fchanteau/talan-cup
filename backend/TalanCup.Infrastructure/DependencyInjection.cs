using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using TalanCup.Infrastructure.Database;

namespace TalanCup.Infrastructure;
public static class DependencyInjection
{
    public static void AddInfrastructure(this IHostApplicationBuilder builder, IConfiguration configuration)
    {
        builder.AddDatabase(configuration);
    }

    public static async Task UseInfrastructureAsync(this IHost host, CancellationToken cancellationToken = default)
    {
        await host.UseDatabaseAsync(cancellationToken);
    }
}
