using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Services.Contracts;

namespace SmartInterviewAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<UserDto>>> Search([FromQuery] string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
                return BadRequest("Search term is required");

            var users = await _userService.SearchUsersAsync(searchTerm);
            return Ok(users);
        }

        [HttpPut("{id}/role")]
        public async Task<IActionResult> UpdateRole(string id, [FromBody] string role)
        {
            if (string.IsNullOrEmpty(role))
                return BadRequest("Role is required");

            var success = await _userService.UpdateUserRoleAsync(id, role);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportToPdf()
        {
            try
            {
                var pdfBytes = await _userService.ExportUsersToPdfAsync();
                return File(pdfBytes, "application/pdf", "users.pdf");
            }
            catch (NotImplementedException)
            {
                return StatusCode(501, "PDF export not yet implemented");
            }
        }

        [HttpGet("{userId}/attempts")]
        public async Task<ActionResult<IEnumerable<UserAttemptDto>>> GetUserAttempts(string userId)
        {
            var attempts = await _userService.GetUserAttemptsAsync(userId);
            return Ok(attempts);
        }
    }
}
