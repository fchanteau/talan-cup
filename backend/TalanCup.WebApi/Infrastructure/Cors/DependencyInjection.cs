namespace TalanCup.WebApi.Infrastructure.Cors;

public static class DependencyInjection
{
    public static void AddTalanCupCors(this IServiceCollection services)
    {
        services.AddOptions<CorsOption>()
            .BindConfiguration(CorsOption.SectionName)
            .ValidateDataAnnotations()
            .ValidateOnStart();
    }

    public static void UseTalanCupCors(this IApplicationBuilder app, IConfiguration configuration)
    {
        var corsOptions = configuration
             .GetSection(CorsOption.SectionName)
             .Get<CorsOption>();

        app.UseCors(cors =>
            cors.WithOrigins(corsOptions?.AllowedOrigins ?? [])
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowedToAllowWildcardSubdomains());
    }
}
