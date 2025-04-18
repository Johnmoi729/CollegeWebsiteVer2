using System;
using System.Collections.Generic;

namespace CollegeWebsite.Domain.Entities
{
    public class Department
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string HeadOfDepartmentId { get; set; }
        public List<string> FacultyIds { get; set; } = new List<string>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}