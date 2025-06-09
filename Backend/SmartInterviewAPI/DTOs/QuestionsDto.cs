using SmartInterviewAPI.Models;

namespace SmartInterviewAPI.DTOs
{
    public class QuestionsDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<QuestionTagDto>? Tags { get; set; }
        public QuestionType Type { get; set; }  // Enum: MCQ, Text, Coding
        public DifficultyLevel Difficulty { get; set; }
        //public string? ImageUrl { get; set; }

    }

    public class QuestionTagDto
    { 
        public string Name { get; set; }
    }
}
