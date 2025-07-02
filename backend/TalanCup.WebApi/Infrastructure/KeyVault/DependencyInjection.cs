using Azure.Identity;

namespace TalanCup.WebApi.Infrastructure.KeyVault;

public static class DependencyInjection
{
    public static void AddTalanCupKeyVault(this IHostApplicationBuilder builder)
    {
        if(builder.Environment.IsProduction())
        {
            builder.Configuration.AddAzureKeyVault(new Uri("https://talancup.vault.azure.net/"),
                                          new DefaultAzureCredential());
        }
    }
}
