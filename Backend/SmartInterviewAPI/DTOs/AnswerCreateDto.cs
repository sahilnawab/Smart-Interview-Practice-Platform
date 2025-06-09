namespace SmartInterviewAPI.DTOs
{
    public class AnswerCreateDto
    {
        public int QuestionId { get; set; }
        public string SubmittedAnswer { get; set; }
        public long TimeTaken { get; set; }
    }
}
