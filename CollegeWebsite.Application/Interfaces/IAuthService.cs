using CollegeWebsite.Application.DTOs;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<bool> CreateAdminUserAsync(RegisterDto registerDto);
    }
}