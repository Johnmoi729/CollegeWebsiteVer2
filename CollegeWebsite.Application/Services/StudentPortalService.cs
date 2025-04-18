using AutoMapper;
using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using CollegeWebsite.Domain.Entities;
using CollegeWebsite.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Services
{
    public class StudentPortalService : IStudentPortalService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IEnrollmentRepository _enrollmentRepository; // You'll need to create this
        private readonly IAnnouncementRepository _announcementRepository; // You'll need to create this
        private readonly IMapper _mapper;

        public StudentPortalService(
            IStudentRepository studentRepository,
            ICourseRepository courseRepository,
            IEnrollmentRepository enrollmentRepository,
            IAnnouncementRepository announcementRepository,
            IMapper mapper)
        {
            _studentRepository = studentRepository;
            _courseRepository = courseRepository;
            _enrollmentRepository = enrollmentRepository;
            _announcementRepository = announcementRepository;
            _mapper = mapper;
        }

        public async Task<StudentPortalDto> GetStudentPortalDataAsync(string studentId)
        {
            var student = await _studentRepository.GetByIdAsync(studentId);
            if (student == null)
                return null;

            // Get enrolled courses
            var enrollments = await _enrollmentRepository.GetEnrollmentsByStudentIdAsync(studentId);
            var courseIds = enrollments.Select(e => e.CourseId).ToList();
            var courses = await _courseRepository.GetCoursesByIdsAsync(courseIds);

            // Get announcements
            var announcements = await _announcementRepository.GetLatestAnnouncementsAsync(10);

            // Map to portal DTO
            var portalDto = new StudentPortalDto
            {
                Id = student.Id,
                Name = student.Name,
                RegistrationNumber = student.RegistrationNumber,
                AdmissionStatus = student.AdmissionStatus,
                ProfileInfo = new ProfileInfoDto
                {
                    Email = student.Email,
                    PhoneNumber = student.PhoneNumber,
                    ResidentialAddress = student.ResidentialAddress,
                    PermanentAddress = student.PermanentAddress,
                    LastUpdated = student.UpdatedAt
                },
                EnrolledCourses = enrollments.Join(
                    courses,
                    e => e.CourseId,
                    c => c.Id,
                    (e, c) => new EnrolledCourseDto
                    {
                        CourseId = c.Id,
                        CourseName = c.Name,
                        CourseCode = c.Code,
                        InstructorName = e.InstructorName,
                        Credits = c.Credits,
                        Status = e.Status
                    }).ToList(),
                Announcements = _mapper.Map<List<AnnouncementDto>>(announcements)
            };

            return portalDto;
        }

        public async Task<bool> UpdateStudentProfileAsync(string studentId, UpdateStudentProfileDto profileDto)
        {
            var student = await _studentRepository.GetByIdAsync(studentId);
            if (student == null)
                return false;

            student.Email = profileDto.Email;
            student.PhoneNumber = profileDto.PhoneNumber;
            student.ResidentialAddress = profileDto.ResidentialAddress;
            student.PermanentAddress = profileDto.PermanentAddress;
            student.UpdatedAt = DateTime.UtcNow;

            return await _studentRepository.UpdateAsync(studentId, student);
        }

        public async Task<List<EnrolledCourseDto>> GetEnrolledCoursesAsync(string studentId)
        {
            var enrollments = await _enrollmentRepository.GetEnrollmentsByStudentIdAsync(studentId);
            var courseIds = enrollments.Select(e => e.CourseId).ToList();
            var courses = await _courseRepository.GetCoursesByIdsAsync(courseIds);

            var enrolledCourses = enrollments.Join(
                courses,
                e => e.CourseId,
                c => c.Id,
                (e, c) => new EnrolledCourseDto
                {
                    CourseId = c.Id,
                    CourseName = c.Name,
                    CourseCode = c.Code,
                    InstructorName = e.InstructorName,
                    Credits = c.Credits,
                    Status = e.Status
                }).ToList();

            return enrolledCourses;
        }

        public async Task<bool> EnrollInCourseAsync(string studentId, string courseId)
        {
            var student = await _studentRepository.GetByIdAsync(studentId);
            if (student == null)
                return false;

            var course = await _courseRepository.GetByIdAsync(courseId);
            if (course == null)
                return false;

            // Check if student is already enrolled
            var existingEnrollment = await _enrollmentRepository.GetEnrollmentAsync(studentId, courseId);
            if (existingEnrollment != null)
                return false;

            // Create enrollment
            var enrollment = new Enrollment
            {
                StudentId = studentId,
                CourseId = courseId,
                EnrollmentDate = DateTime.UtcNow,
                Status = "Active"
            };

            await _enrollmentRepository.AddAsync(enrollment);
            return true;
        }

        public async Task<bool> DropCourseAsync(string studentId, string courseId)
        {
            var enrollment = await _enrollmentRepository.GetEnrollmentAsync(studentId, courseId);
            if (enrollment == null)
                return false;

            enrollment.Status = "Withdrawn";
            enrollment.UpdatedAt = DateTime.UtcNow;

            return await _enrollmentRepository.UpdateAsync(enrollment.Id, enrollment);
        }
    }
}