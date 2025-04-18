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
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository courseRepository, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
        {
            var courses = await _courseRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task<CourseDto> GetCourseByIdAsync(string id)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            return _mapper.Map<CourseDto>(course);
        }

        public async Task<IEnumerable<CourseDto>> GetCoursesByDepartmentAsync(string departmentId)
        {
            var courses = await _courseRepository.GetCoursesByDepartmentAsync(departmentId);
            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task<CourseDto> CreateCourseAsync(CreateCourseDto createCourseDto)
        {
            var course = _mapper.Map<Course>(createCourseDto);
            course.CreatedAt = DateTime.UtcNow;
            course.UpdatedAt = DateTime.UtcNow;

            var createdCourse = await _courseRepository.AddAsync(course);
            return _mapper.Map<CourseDto>(createdCourse);
        }

        public async Task<bool> UpdateCourseAsync(string id, UpdateCourseDto updateCourseDto)
        {
            var existingCourse = await _courseRepository.GetByIdAsync(id);
            if (existingCourse == null)
                return false;

            _mapper.Map(updateCourseDto, existingCourse);
            existingCourse.UpdatedAt = DateTime.UtcNow;

            return await _courseRepository.UpdateAsync(id, existingCourse);
        }

        public async Task<bool> DeleteCourseAsync(string id)
        {
            return await _courseRepository.DeleteAsync(id);
        }
    }
}