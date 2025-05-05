using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TalanCup.Application.Common;

namespace TalanCup.Infrastructure.Providers;
public static class DependencyInjection
{
    public static void AddProviders(this IHostApplicationBuilder builder)
    {
        builder.Services.AddScoped<IDateTimeProvider, DateTimeProvider>();
        builder.Services.AddScoped<ICurrentUserProvider, CurrentUserProvider>();
    }
}
