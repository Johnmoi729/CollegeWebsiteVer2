// UserService.cs - update to use IPasswordHasher
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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher; // New interface
        private readonly IMapper _mapper;

        public UserService(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto> GetUserByIdAsync(string id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetUserByUsernameAsync(string username)
        {
            var user = await _userRepository.FindByUsernameAsync(username);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<IEnumerable<UserDto>> GetUsersByRoleAsync(string role)
        {
            var users = await _userRepository.GetUsersByRoleAsync(role);
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<bool> UpdateUserAsync(string id, UpdateUserDto updateUserDto)
        {
            var existingUser = await _userRepository.GetByIdAsync(id);
            if (existingUser == null)
                return false;

            _mapper.Map(updateUserDto, existingUser);
            existingUser.UpdatedAt = DateTime.UtcNow;

            // If password is being updated
            if (!string.IsNullOrEmpty(updateUserDto.Password))
            {
                _passwordHasher.CreatePasswordHash(updateUserDto.Password, out string passwordHash, out string salt);
                existingUser.PasswordHash = passwordHash;
                existingUser.Salt = salt;
            }

            return await _userRepository.UpdateAsync(id, existingUser);
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            return await _userRepository.DeleteAsync(id);
        }

        public async Task<bool> AddRoleToUserAsync(string id, string role)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return false;

            if (!user.Roles.Contains(role))
            {
                user.Roles.Add(role);
                user.UpdatedAt = DateTime.UtcNow;
                return await _userRepository.UpdateAsync(id, user);
            }

            return true; // Role already exists
        }

        public async Task<bool> RemoveRoleFromUserAsync(string id, string role)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return false;

            if (user.Roles.Contains(role))
            {
                user.Roles.Remove(role);
                user.UpdatedAt = DateTime.UtcNow;
                return await _userRepository.UpdateAsync(id, user);
            }

            return true; // Role was not present
        }
    }
}