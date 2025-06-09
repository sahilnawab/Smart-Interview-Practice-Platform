using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartInterviewAPI.Data;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.mapper;
using SmartInterviewAPI.Models;
using SmartInterviewAPI.Services.Contracts;

namespace SmartInterviewAPI.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserService(
            ApplicationDbContext context,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userDtos.Add(user.ToDto(roles));
            }

            return userDtos;
        }

        public async Task<UserDto> GetUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            return user.ToDto(roles);
        }

        public async Task<bool> UpdateUserRoleAsync(string userId, string role)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return false;

            // Check if role exists, create if not
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            // Get current roles
            var currentRoles = await _userManager.GetRolesAsync(user);

            // Remove from all roles
            if (currentRoles.Any())
            {
                await _userManager.RemoveFromRolesAsync(user, currentRoles);
            }

            // Add to new role
            var result = await _userManager.AddToRoleAsync(user, role);
            return result.Succeeded;
        }

        public async Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm)
        {
            var users = await _userManager.Users
                .Where(u => u.UserName.Contains(searchTerm) ||
                            u.Email.Contains(searchTerm) ||
                            u.FullName.Contains(searchTerm))
                .ToListAsync();

            var userDtos = new List<UserDto>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userDtos.Add(user.ToDto(roles));
            }

            return userDtos;
        }

        public async Task<byte[]> ExportUsersToPdfAsync()
        {
            // Implementation for PDF export would go here
            // This is a placeholder that would be implemented with a PDF library
            throw new NotImplementedException("PDF export not yet implemented");
        }

        public async Task<IEnumerable<UserAttemptDto>> GetUserAttemptsAsync(string userId)
        {
            var attempts = await _context.UserAttempts
                .Include(a => a.User)
                .Include(a => a.Question)
                .Where(a => a.UserId == userId)
                .ToListAsync();

            return attempts.ToDtoList();
        }
    }
}
