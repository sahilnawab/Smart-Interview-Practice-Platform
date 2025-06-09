namespace SmartInterviewAPI.DTOs
{
    public class UserAttemptDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int QuestionId { get; set; }
        public string QuestionTitle { get; set; }
        public string SubmittedAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public DateTime AttemptedAt { get; set; }
        public TimeSpan TimeTaken { get; set; }
    }
}
