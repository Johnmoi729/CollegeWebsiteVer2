using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CollegeWebsite.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            var response = await _authService.LoginAsync(loginDto);
            if (response == null)
                return Unauthorized();

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
        {
            var response = await _authService.RegisterAsync(registerDto);
            if (response == null)
                return BadRequest("Registration failed. Username or email already exists.");

            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdmin(RegisterDto registerDto)
        {
            var result = await _authService.CreateAdminUserAsync(registerDto);
            if (!result)
                return BadRequest("Admin creation failed. Username or email already exists.");

            return Ok("Admin user created successfully");
        }
    }
}