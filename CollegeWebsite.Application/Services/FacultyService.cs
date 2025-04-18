using AutoMapper;
using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using CollegeWebsite.Domain.Entities;
using CollegeWebsite.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Services
{
    public class FacultyService : IFacultyService
    {
        private readonly IFacultyRepository _facultyRepository;
        private readonly IMapper _mapper;

        public FacultyService(IFacultyRepository facultyRepository, IMapper mapper)
        {
            _facultyRepository = facultyRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FacultyDto>> GetAllFacultyAsync()
        {
            var faculty = await _facultyRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<FacultyDto>>(faculty);
        }

        public async Task<FacultyDto> GetFacultyByIdAsync(string id)
        {
            var faculty = await _facultyRepository.GetByIdAsync(id);
            return _mapper.Map<FacultyDto>(faculty);
        }

        public async Task<IEnumerable<FacultyDto>> GetFacultyByDepartmentAsync(string departmentId)
        {
            var faculty = await _facultyRepository.GetFacultyByDepartmentAsync(departmentId);
            return _mapper.Map<IEnumerable<FacultyDto>>(faculty);
        }

        public async Task<FacultyDto> CreateFacultyAsync(CreateFacultyDto createFacultyDto)
        {
            var faculty = _mapper.Map<Faculty>(createFacultyDto);
            faculty.CreatedAt = DateTime.UtcNow;
            faculty.UpdatedAt = DateTime.UtcNow;

            var createdFaculty = await _facultyRepository.AddAsync(faculty);
            return _mapper.Map<FacultyDto>(createdFaculty);
        }

        public async Task<bool> UpdateFacultyAsync(string id, UpdateFacultyDto updateFacultyDto)
        {
            var existingFaculty = await _facultyRepository.GetByIdAsync(id);
            if (existingFaculty == null)
                return false;

            _mapper.Map(updateFacultyDto, existingFaculty);
            existingFaculty.UpdatedAt = DateTime.UtcNow;

            return await _facultyRepository.UpdateAsync(id, existingFaculty);
        }

        public async Task<bool> DeleteFacultyAsync(string id)
        {
            return await _facultyRepository.DeleteAsync(id);
        }
    }
}