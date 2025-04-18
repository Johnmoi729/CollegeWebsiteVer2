using System;
using System.Collections.Generic;

namespace CollegeWebsite.Application.DTOs
{
    public class CourseDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string DepartmentId { get; set; }
        public List<string> Prerequisites { get; set; }
        public int Credits { get; set; }
        public string Duration { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateCourseDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string DepartmentId { get; set; }
        public List<string> Prerequisites { get; set; }
        public int Credits { get; set; }
        public string Duration { get; set; }
    }

    public class UpdateCourseDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string DepartmentId { get; set; }
        public List<string> Prerequisites { get; set; }
        public int Credits { get; set; }
        public string Duration { get; set; }
        public bool IsActive { get; set; }
    }
}