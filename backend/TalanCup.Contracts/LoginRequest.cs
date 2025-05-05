using System.ComponentModel.DataAnnotations;

namespace TalanCup.Contracts;
public class LoginRequest
{
    [Required]
    public string Login { get; set; } = "";
}
