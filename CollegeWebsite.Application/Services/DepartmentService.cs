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
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;

        public DepartmentService(IDepartmentRepository departmentRepository, IMapper mapper)
        {
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DepartmentDto>> GetAllDepartmentsAsync()
        {
            var departments = await _departmentRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<DepartmentDto>>(departments);
        }

        public async Task<DepartmentDto> GetDepartmentByIdAsync(string id)
        {
            var department = await _departmentRepository.GetByIdAsync(id);
            return _mapper.Map<DepartmentDto>(department);
        }

        public async Task<DepartmentDto> CreateDepartmentAsync(CreateDepartmentDto createDepartmentDto)
        {
            var department = _mapper.Map<Department>(createDepartmentDto);
            department.CreatedAt = DateTime.UtcNow;
            department.UpdatedAt = DateTime.UtcNow;

            var createdDepartment = await _departmentRepository.AddAsync(department);
            return _mapper.Map<DepartmentDto>(createdDepartment);
        }

        public async Task<bool> UpdateDepartmentAsync(string id, UpdateDepartmentDto updateDepartmentDto)
        {
            var existingDepartment = await _departmentRepository.GetByIdAsync(id);
            if (existingDepartment == null)
                return false;

            _mapper.Map(updateDepartmentDto, existingDepartment);
            existingDepartment.UpdatedAt = DateTime.UtcNow;

            return await _departmentRepository.UpdateAsync(id, existingDepartment);
        }

        public async Task<bool> DeleteDepartmentAsync(string id)
        {
            return await _departmentRepository.DeleteAsync(id);
        }
    }
}