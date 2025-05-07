using Microsoft.AspNetCore.Mvc;

namespace TalanCup.WebApi.Controllers;
[Route("api/test")]
[ApiController]
public class TestController : ApiController
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello from TalanCup");
    }
}
