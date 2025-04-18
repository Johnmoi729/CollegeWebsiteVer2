using System;
using System.Collections.Generic;

namespace CollegeWebsite.Application.DTOs
{
    public class StudentPortalDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string RegistrationNumber { get; set; }
        public string AdmissionStatus { get; set; }
        public ProfileInfoDto ProfileInfo { get; set; }
        public List<EnrolledCourseDto> EnrolledCourses { get; set; }
        public List<AnnouncementDto> Announcements { get; set; }
    }

    public class ProfileInfoDto
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ResidentialAddress { get; set; }
        public string PermanentAddress { get; set; }
        public DateTime LastUpdated { get; set; }
    }

    public class UpdateStudentProfileDto
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ResidentialAddress { get; set; }
        public string PermanentAddress { get; set; }
    }

    public class EnrolledCourseDto
    {
        public string CourseId { get; set; }
        public string CourseName { get; set; }
        public string CourseCode { get; set; }
        public string InstructorName { get; set; }
        public int Credits { get; set; }
        public string Status { get; set; } // Active, Completed, Withdrawn
    }

    public class AnnouncementDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PostedDate { get; set; }
        public string PostedBy { get; set; }
        public bool IsImportant { get; set; }
    }
}