using CollegeWebsite.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IStudentPortalService
    {
        Task<StudentPortalDto> GetStudentPortalDataAsync(string studentId);
        Task<bool> UpdateStudentProfileAsync(string studentId, UpdateStudentProfileDto profileDto);
        Task<List<EnrolledCourseDto>> GetEnrolledCoursesAsync(string studentId);
        Task<bool> EnrollInCourseAsync(string studentId, string courseId);
        Task<bool> DropCourseAsync(string studentId, string courseId);
    }
}