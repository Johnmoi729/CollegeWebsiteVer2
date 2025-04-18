using CollegeWebsite.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetAllCoursesAsync();
        Task<CourseDto> GetCourseByIdAsync(string id);
        Task<IEnumerable<CourseDto>> GetCoursesByDepartmentAsync(string departmentId);
        Task<CourseDto> CreateCourseAsync(CreateCourseDto createCourseDto);
        Task<bool> UpdateCourseAsync(string id, UpdateCourseDto updateCourseDto);
        Task<bool> DeleteCourseAsync(string id);
    }
}