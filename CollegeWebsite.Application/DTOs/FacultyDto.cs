using System;
using System.Collections.Generic;

namespace CollegeWebsite.Application.DTOs
{
    public class FacultyDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Qualification { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DepartmentId { get; set; }
        public List<string> CoursesTaught { get; set; }
        public string Bio { get; set; }
        public DateTime JoinDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateFacultyDto
    {
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Qualification { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DepartmentId { get; set; }
        public List<string> CoursesTaught { get; set; }
        public string Bio { get; set; }
        public DateTime JoinDate { get; set; }
    }

    public class UpdateFacultyDto
    {
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Qualification { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DepartmentId { get; set; }
        public List<string> CoursesTaught { get; set; }
        public string Bio { get; set; }
        public DateTime JoinDate { get; set; }
        public bool IsActive { get; set; }
    }
}