// AuthService.cs updated to use IJwtTokenGenerator and IPasswordHasher
using AutoMapper;
using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using CollegeWebsite.Application.Interfaces.Security; // Updated import
using CollegeWebsite.Domain.Entities;
using CollegeWebsite.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator; // Interface instead of concrete class
        private readonly IPasswordHasher _passwordHasher; // New interface
        private readonly IMapper _mapper;

        public AuthService(
            IUserRepository userRepository,
            IJwtTokenGenerator jwtTokenGenerator,
            IPasswordHasher passwordHasher,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.FindByUsernameAsync(loginDto.Username);
            if (user == null)
                return null;

            if (!_passwordHasher.VerifyPasswordHash(loginDto.Password, user.PasswordHash, user.Salt))
                return null;

            // Update last login time
            user.LastLogin = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user.Id, user);

            // Generate JWT token
            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Roles = user.Roles,
                Token = token
            };
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            if (registerDto.Password != registerDto.ConfirmPassword)
                return null;

            if (await _userRepository.ExistsAsync(u => u.Username == registerDto.Username))
                return null;

            if (await _userRepository.ExistsAsync(u => u.Email == registerDto.Email))
                return null;

            _passwordHasher.CreatePasswordHash(registerDto.Password, out string passwordHash, out string salt);

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = passwordHash,
                Salt = salt,
                Roles = new List<string> { "Student" },
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user);

            // Generate JWT token
            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Roles = user.Roles,
                Token = token
            };
        }

        public async Task<bool> CreateAdminUserAsync(RegisterDto registerDto)
        {
            // Similarly update this method to use _passwordHasher
            if (registerDto.Password != registerDto.ConfirmPassword)
                return false;

            if (await _userRepository.ExistsAsync(u => u.Username == registerDto.Username))
                return false;

            if (await _userRepository.ExistsAsync(u => u.Email == registerDto.Email))
                return false;

            _passwordHasher.CreatePasswordHash(registerDto.Password, out string passwordHash, out string salt);

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = passwordHash,
                Salt = salt,
                Roles = new List<string> { "Admin" },
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user);
            return true;
        }
    }
}