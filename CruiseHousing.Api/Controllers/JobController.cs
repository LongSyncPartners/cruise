using CruiseHousing.Api.Constants;
using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CruiseHousing.Api.Controllers
{
    [ApiController]
    [Route("api/jobs")]
    public class JobController : ControllerBase
    {
        private readonly JobService _jobService;

        public JobController(JobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _jobService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id:long}")]
        public async Task<JobStatusResponse> GetByIdAsync(long id)
        {
            var result = await _jobService.GetByIdAsync(id);

            return result;
        }
    }
}
