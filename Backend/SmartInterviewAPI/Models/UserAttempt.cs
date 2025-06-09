using System.Text.Json.Serialization;

namespace SmartInterviewAPI.Models
{
    public class UserAttempt
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }

        public int QuestionId { get; set; }
        [JsonIgnore]
        public Question Question { get; set; }

        public string SubmittedAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public DateTime AttemptedAt { get; set; }
        public TimeSpan TimeTaken { get; set; }
        // 🧠 AI Feedback Fields
        public string? Feedback { get; set; }   // "Good start, elaborate more on XYZ"
        public int? Score { get; set; }
    }
}
