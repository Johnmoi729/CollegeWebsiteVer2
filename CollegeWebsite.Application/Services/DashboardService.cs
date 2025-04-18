using CollegeWebsite.Domain.Repositories; // For repository interfaces
using CollegeWebsite.Domain.Entities;     // For entity classes
using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using System.Threading.Tasks;
using System;

namespace CollegeWebsite.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IFacultyRepository _facultyRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IFeedbackRepository _feedbackRepository;

        public DashboardService(
            IStudentRepository studentRepository,
            ICourseRepository courseRepository,
            IFacultyRepository facultyRepository,
            IDepartmentRepository departmentRepository,
            IFeedbackRepository feedbackRepository)
        {
            _studentRepository = studentRepository;
            _courseRepository = courseRepository;
            _facultyRepository = facultyRepository;
            _departmentRepository = departmentRepository;
            _feedbackRepository = feedbackRepository;
        }

        public async Task<DashboardStatsDto> GetDashboardStatsAsync()
        {
            var totalStudents = await _studentRepository.CountAsync();
            var pendingAdmissions = await _studentRepository.CountByStatusAsync("Waiting");
            var totalCourses = await _courseRepository.CountAsync();
            var totalFaculty = await _facultyRepository.CountAsync();
            var totalDepartments = await _departmentRepository.CountAsync();
            var unreadFeedback = await _feedbackRepository.CountUnreadAsync();

            return new DashboardStatsDto
            {
                TotalStudents = (int)totalStudents,
                TotalCourses = (int)totalCourses,
                TotalFaculty = (int)totalFaculty,
                TotalDepartments = (int)totalDepartments,
                PendingAdmissions = (int)pendingAdmissions,
                UnreadFeedback = (int)unreadFeedback
            };
        }
    }
}