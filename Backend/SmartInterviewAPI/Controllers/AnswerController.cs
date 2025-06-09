using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Services.Contracts;
using System.Security.Claims;

namespace SmartInterviewAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerService _answerService;

        public AnswerController(IAnswerService answerService)
        {
            _answerService = answerService;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitAnswer([FromBody] AnswerCreateDto dto)
        {
            string userId = User.FindFirst("UserId")?.Value;
                   if (userId == null) return Unauthorized();

            var attempt = await _answerService.SubmitAnswerAsync(userId, dto);
            return Ok(attempt);
        }

        [HttpGet("mine")]
        public async Task<IActionResult> MyAnswers()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var attempts = await _answerService.GetUserAttemptsAsync(userId);
            return Ok(attempts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var attempt = await _answerService.GetByIdAsync(id);
            return attempt == null ? NotFound() : Ok(attempt);
        }
    }
}
