using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Models;

namespace SmartInterviewAPI.mapper
{
    public static class QuestionMapper
    {
        public static QuestionsDto ToDto(this Question question)
        {
            return new QuestionsDto
            {
                Title = question.Title,
                Description = question.Description,
                Type = question.Type,
                Difficulty = question.Difficulty,
                Tags = question.QuestionTags?
                    .Select(qt => new QuestionTagDto { Name = qt.Tag.Name })
                    .ToList() ?? new List<QuestionTagDto>()
            };
        }

        public static Question ToEntity(this QuestionCreateDto dto)
        {
            return new Question
            {
                Title = dto.Title,
                Description = dto.Description,
                Type = dto.Type, // Default value, can be updated later
                Difficulty = dto.Difficulty, // Default value, can be updated later
                QuestionTags = new List<QuestionTag>() // Tags will be added separately
            };
        }

        public static IEnumerable<QuestionsDto> ToDtoList(this IEnumerable<Question> questions)
        {
            return questions.Select(q => q.ToDto());
        }
   
}
}
