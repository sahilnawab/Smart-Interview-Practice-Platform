using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Models;
using SmartInterviewAPI.Services.Contracts;
using SmartInterviewAPI.utils;
using System.Net;

namespace SmartInterviewAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly JWTTokenGenerator _tokenGenerator;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailService _emailSender;
        private readonly IViewRenderService _viewRenderService;

        public AuthController(UserManager<AppUser> userManager, JWTTokenGenerator tokenGenerator, RoleManager<IdentityRole> roleManager, IEmailService emailSender, IViewRenderService viewRenderService)
        {
            _userManager = userManager;
            _tokenGenerator = tokenGenerator;
            _roleManager = roleManager;
            _emailSender = emailSender;
            _viewRenderService = viewRenderService;
        }
        

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Invalid credentials");

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenGenerator.GenerateToken(user, roles);
            
            return Ok(new { token,user.Id,user.FullName,user.Email,roles});
        }

        [HttpPost("Register")]

        public async Task<ActionResult<string>> Register([FromBody] RegisterDto model) { 
            var user = new AppUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.FullName
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) {
                return BadRequest();
            }
            await _userManager.AddToRoleAsync(user, "User");
            var token =await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var encodedToken = WebUtility.UrlEncode(token);
            var confirmUrl = $"{model.FrontendUrl}/confirm-email?userId={user.Id}&token={encodedToken}";
            var emailModel = new EmailConfirmModel { Name = user.FullName, ConfirmationLink = confirmUrl };

            var emailBody = await _viewRenderService.RenderViewToStringAsync("~/EmailTemplate/EmailConfirmationTemplate.cshtml", emailModel);

            await _emailSender.SendEmailAsync(user.Email,"Confirm Your Email" ,emailBody);

            return Ok("Registration successful. Please confirm your email.");

        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
                return Ok("Email confirmed successfully. You can now log in.");

            return BadRequest("Invalid token or confirmation failed.");
        }

    }
}
