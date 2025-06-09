namespace SmartInterviewAPI.Models
{
    public class Question
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public QuestionType Type { get; set; }  // Enum: MCQ, Text, Coding
        public DifficultyLevel Difficulty { get; set; }
       

        public ICollection<UserAttempt> Attempts { get; set; }
        public ICollection<QuestionTag> QuestionTags { get; set; }
    }
    public enum QuestionType
    {
        Text,
        MultipleChoice,
        Coding
    }

    public enum DifficultyLevel
    {
        Easy,
        Medium,
        Hard
    }

}
