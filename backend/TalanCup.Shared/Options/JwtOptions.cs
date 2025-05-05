using System.ComponentModel.DataAnnotations;

namespace TalanCup.Shared.Options;

public class JwtOptions
{
    public static string SectionName = "TalanCup:JWT";

    [Required]
    public string Issuer { get; set; } = "";

    [Required]
    public string Audience { get; set; } = "";

    [Required]
    public string SecretKey { get; set; } = "";
}
