using System;
using System.Collections.Generic;

namespace CollegeWebsite.Domain.Entities
{
    public class Course
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string DepartmentId { get; set; }
        public List<string> Prerequisites { get; set; } = new List<string>();
        public int Credits { get; set; }
        public string Duration { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}