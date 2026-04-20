using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace CruiseHousing.Api.Controllers
{
    [ApiController]
    [Route("error")]
    public class ErrorController : ControllerBase
    {
        private readonly ILogger<ErrorController> _logger;

        public ErrorController(ILogger<ErrorController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult HandleError()
        {
            var feature = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var ex = feature?.Error;

            if (ex != null)
            {
                _logger.LogError(ex, "Unhandled exception");
            }

            return Problem(
                title: "Unexpected error",
                statusCode: 500
            );
        }
    }
}
