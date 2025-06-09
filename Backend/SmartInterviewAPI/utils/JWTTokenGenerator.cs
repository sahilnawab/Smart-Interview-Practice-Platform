using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SmartInterviewAPI.Models;
using SmartInterviewAPI.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime;
using System.Security.Claims;
using System.Text;

namespace SmartInterviewAPI.utils
{
    public class JWTTokenGenerator
    {
        private readonly JWTSetting _settings;

        public JWTTokenGenerator(IOptions<JWTSetting> settings)
        {
            _settings = settings.Value;


        }



        public string GenerateToken(AppUser user, IList<string> roles)
        {

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("FullName", user.FullName ?? string.Empty),
                new Claim("UserId", user.Id)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
           issuer: _settings.Issuer,
           audience: _settings.Audience,
           claims: claims,
           expires: DateTime.UtcNow.AddMinutes(_settings.ExpiresInMinutes),
           signingCredentials: credentials
       );
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
