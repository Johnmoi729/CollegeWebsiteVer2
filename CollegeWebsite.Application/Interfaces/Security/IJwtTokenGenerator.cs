using CollegeWebsite.Domain.Entities;

namespace CollegeWebsite.Application.Interfaces.Security
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}