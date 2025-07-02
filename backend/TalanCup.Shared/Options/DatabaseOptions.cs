using System.ComponentModel.DataAnnotations;

namespace TalanCup.Shared.Options;
public class DatabaseOptions
{
    public static string SectionName = "TalanCup:Database";

    [Required]
    public bool InitData { get; set; } = false;
}
