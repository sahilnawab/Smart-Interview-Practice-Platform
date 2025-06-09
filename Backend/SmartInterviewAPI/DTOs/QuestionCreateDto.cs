using SmartInterviewAPI.Models;

namespace SmartInterviewAPI.DTOs
{
    public class QuestionCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DifficultyLevel Difficulty { get; set; }
        public QuestionType Type { get; set; }  // Enum: MCQ, Text, Coding

        public List<string>? Tags { get; set; }
    }
}
