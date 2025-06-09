using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Models;

namespace SmartInterviewAPI.mapper
{
    public static class UserMapper
    {
        public static UserDto ToDto(this AppUser user, IList<string> roles = null)
        {
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                Roles = roles?.ToList() ?? new List<string>()
            };
        }

        public static UserAttemptDto ToDto(this UserAttempt attempt)
        {
            return new UserAttemptDto
            {
                Id = attempt.Id,
                UserId = attempt.UserId,
                UserName = attempt.User?.UserName,
                QuestionId = attempt.QuestionId,
                QuestionTitle = attempt.Question?.Title,
                SubmittedAnswer = attempt.SubmittedAnswer,
                IsCorrect = attempt.IsCorrect,
                AttemptedAt = attempt.AttemptedAt,
                TimeTaken = attempt.TimeTaken
            };
        }

        public static IEnumerable<UserAttemptDto> ToDtoList(this IEnumerable<UserAttempt> attempts)
        {
            return attempts.Select(a => a.ToDto());
        }
    }
}
