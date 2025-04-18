using System;
using System.Collections.Generic;

namespace CollegeWebsite.Domain.Entities
{
    public class Faculty
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Qualification { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DepartmentId { get; set; }
        public List<string> CoursesTaught { get; set; } = new List<string>();
        public string Bio { get; set; }
        public DateTime JoinDate { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}