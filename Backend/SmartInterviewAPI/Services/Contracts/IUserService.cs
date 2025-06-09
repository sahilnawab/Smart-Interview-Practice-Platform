using SmartInterviewAPI.DTOs;

namespace SmartInterviewAPI.Services.Contracts
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(string id);
        Task<bool> UpdateUserRoleAsync(string userId, string role);
        Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm);
        Task<byte[]> ExportUsersToPdfAsync();
        Task<IEnumerable<UserAttemptDto>> GetUserAttemptsAsync(string userId);
    }
}
