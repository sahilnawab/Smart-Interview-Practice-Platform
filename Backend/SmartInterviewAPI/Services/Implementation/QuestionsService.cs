using Microsoft.EntityFrameworkCore;
using SmartInterviewAPI.Data;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.mapper;
using SmartInterviewAPI.Models;
using SmartInterviewAPI.Services.Contracts;

namespace SmartInterviewAPI.Services.Implementation
{
    public class QuestionsService : IQuestionsService
    {
        private readonly ApplicationDbContext _context;
      

        public QuestionsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<QuestionsDto> GetAll()
        {
            var questions = _context.Questions
                .Include(q => q.QuestionTags)
                .ThenInclude(qt => qt.Tag)
                .ToList();

            return questions.ToDtoList();
        }

        public QuestionsDto? GetById(int id)
        {
            var question = _context.Questions
                .Include(q => q.QuestionTags)
                .ThenInclude(qt => qt.Tag)
                .FirstOrDefault(q => q.Id == id);

            return question?.ToDto();
        }

        public IEnumerable<QuestionsDto> GetByTag(string tag)
        {
            var questions = _context.Questions
                .Include(q => q.QuestionTags)
                .ThenInclude(qt => qt.Tag)
                .Where(q => q.QuestionTags.Any(qt => qt.Tag.Name.ToLower() == tag.ToLower()))
                .ToList();

            return questions.ToDtoList();
        }

        public QuestionsDto Create(QuestionCreateDto dto)
        {
            var question = dto.ToEntity();

            _context.Questions.Add(question);
            _context.SaveChanges();

            // Process tags
            if (dto.Tags != null && dto.Tags.Any())
            {
                foreach (var tagName in dto.Tags)
                {
                    // Find existing tag or create new one
                    var tag = _context.Set<Tag>().FirstOrDefault(t => t.Name.ToLower() == tagName.ToLower());
                    if (tag == null)
                    {
                        tag = new Tag { Name = tagName };
                        _context.Set<Tag>().Add(tag);
                        _context.SaveChanges();
                    }

                    // Create question-tag relationship
                    var questionTag = new QuestionTag
                    {
                        QuestionId = question.Id,
                        TagId = tag.Id
                    };
                    _context.Set<QuestionTag>().Add(questionTag);
                }
                _context.SaveChanges();
            }

            return GetById(question.Id);
        }

        public bool Update(int id, QuestionCreateDto dto)
        {
            var question = _context.Questions
                .Include(q => q.QuestionTags)
                .FirstOrDefault(q => q.Id == id);

            if (question == null)
                return false;

            // Update basic properties
            question.Title = dto.Title;
            question.Description = dto.Description;

            // Update tags
            if (dto.Tags != null)
            {
                // Remove existing tags
                _context.Set<QuestionTag>().RemoveRange(question.QuestionTags);

                // Add new tags
                foreach (var tagName in dto.Tags)
                {
                    // Find existing tag or create new one
                    var tag = _context.Set<Tag>().FirstOrDefault(t => t.Name.ToLower() == tagName.ToLower());
                    if (tag == null)
                    {
                        tag = new Tag { Name = tagName };
                        _context.Set<Tag>().Add(tag);
                        _context.SaveChanges();
                    }

                    // Create question-tag relationship
                    var questionTag = new QuestionTag
                    {
                        QuestionId = question.Id,
                        TagId = tag.Id
                    };
                    _context.Set<QuestionTag>().Add(questionTag);
                }
            }

            _context.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            var question = _context.Questions.Find(id);
            if (question == null)
                return false;

            _context.Questions.Remove(question);
            _context.SaveChanges();
            return true;
        }

        // Additional methods for filtering and searching
        public IEnumerable<QuestionsDto> SearchByKeyword(string keyword)
        {
            var questions = _context.Questions
                .Include(q => q.QuestionTags)
                .ThenInclude(qt => qt.Tag)
                .Where(q => q.Title.Contains(keyword) || q.Description.Contains(keyword))
                .ToList();

            return questions.ToDtoList();
        }

        public IEnumerable<QuestionsDto> FilterByDifficulty(DifficultyLevel difficulty)
        {
            var questions = _context.Questions
                .Include(q => q.QuestionTags)
                .ThenInclude(qt => qt.Tag)
                .Where(q => q.Difficulty == difficulty)
                .ToList();

            return questions.ToDtoList();
        }

        public async Task<byte[]> ExportQuestionsToPdfAsync()
        {
            // Implementation for PDF export would go here
            // This is a placeholder that would be implemented with a PDF library
            throw new NotImplementedException("PDF export not yet implemented");
        }

        public async Task<IEnumerable<string>> GetAllTags() {
            var tags =await  _context.Tag
               .Select(t => t.Name)
               .Distinct()
               .OrderBy(t => t)
               .ToListAsync();
            return tags;
        }


        Task<string> IQuestionsService.UploadQuestionImageAsync(int questionId, Stream imageStream, string fileName)
        {
            throw new NotImplementedException();
        }

        Task<bool> IQuestionsService.DeleteQuestionImageAsync(int questionId)
        {
            throw new NotImplementedException();
        }
    }
}
