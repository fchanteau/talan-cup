namespace TalanCup.WebApi.Infrastructure.Cors;

public class CorsOption
{
    public static string SectionName = "TalanCup:Cors";

    public string[] AllowedOrigins { get; set; } = [];
}
