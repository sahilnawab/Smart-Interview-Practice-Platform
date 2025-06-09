using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Models;

namespace SmartInterviewAPI.Services.Contracts
{
    public interface IAnswerService
    {
        Task<UserAttempt> SubmitAnswerAsync(string userId, AnswerCreateDto dto);
        Task<IEnumerable<UserAttempt>> GetUserAttemptsAsync(string userId);
        Task<UserAttempt?> GetByIdAsync(int id);
    }
}
