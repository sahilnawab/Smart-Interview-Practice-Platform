using Azure.Core;
using Microsoft.EntityFrameworkCore;
using SmartInterviewAPI.Data;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Models;
using SmartInterviewAPI.Services.Contracts;

namespace SmartInterviewAPI.Services.Implementation
{
    public class AnswerService : IAnswerService
    {
        private readonly ApplicationDbContext _context;
        private readonly KafkaProducerService _kafkaProducer;


        public AnswerService(ApplicationDbContext context, KafkaProducerService kafkaProducer)
        {
            _context = context;
            _kafkaProducer = kafkaProducer;
        }
        public async Task<UserAttempt> SubmitAnswerAsync(string userId, AnswerCreateDto dto)
        {
            TimeSpan timeSpan = TimeSpan.FromSeconds(dto.TimeTaken);

          
            var attempt = new UserAttempt
            {
                UserId = userId,
                QuestionId = dto.QuestionId,
                SubmittedAnswer = dto.SubmittedAnswer,
                AttemptedAt = DateTime.UtcNow,
                TimeTaken = timeSpan,
                IsCorrect = false, // Set later or by AI
            };

            _context.UserAttempts.Add(attempt);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception e)
            { Console.WriteLine(e.Message); }
            var question = await _context.Questions
                .FirstOrDefaultAsync(q => q.Id == dto.QuestionId);

            //send Answer to kafka for evaluation
            await _kafkaProducer.SendMessageAsync("answer-submitted", new
            {
                AttemptId = attempt.Id,
                QuestionId = dto.QuestionId,
                Question=question.Description,
                UserId = userId,
                SubmittedAnswer = dto.SubmittedAnswer
            });


            return attempt;
        }

        public async Task<IEnumerable<UserAttempt>> GetUserAttemptsAsync(string userId)
        {
            return await _context.UserAttempts
                .Where(u => u.UserId == userId)
                .Include(u => u.Question)
                .OrderByDescending(u => u.AttemptedAt)
                .ToListAsync();
        }

        public async Task<UserAttempt?> GetByIdAsync(int id)
        {
            return await _context.UserAttempts
                .Include(u => u.Question)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
