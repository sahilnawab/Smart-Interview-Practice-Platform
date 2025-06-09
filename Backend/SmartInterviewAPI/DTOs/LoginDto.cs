using System.ComponentModel.DataAnnotations;

namespace SmartInterviewAPI.DTOs
{
    public class LoginDto
    {

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        // Optional: You can add additional properties if needed, such as:
        // public string RememberMe { get; set; } // For "Remember Me" functionality
        // public string ReturnUrl { get; set; } // For redirecting after login
    }
}
