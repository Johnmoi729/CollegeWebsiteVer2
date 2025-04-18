using System;

namespace CollegeWebsite.Domain.Entities
{
    public class Enrollment
    {
        public string Id { get; set; }
        public string StudentId { get; set; }
        public string CourseId { get; set; }
        public string InstructorName { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string Status { get; set; } // Active, Completed, Withdrawn
        public decimal? Grade { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}