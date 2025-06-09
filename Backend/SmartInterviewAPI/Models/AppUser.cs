using Microsoft.AspNetCore.Identity;

namespace SmartInterviewAPI.Models
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
        public ICollection<UserAttempt> Attempts { get; set; }
    }

  
}
