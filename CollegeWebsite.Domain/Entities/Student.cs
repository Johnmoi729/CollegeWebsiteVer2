using System;
using System.Collections.Generic;

namespace CollegeWebsite.Domain.Entities
{
    public class Student
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; } // Added property
        public string PhoneNumber { get; set; } // Added property
        public string ResidentialAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string AdmissionStatus { get; set; } // Waiting, Accepted, etc.
        public string RegistrationNumber { get; set; }
        public List<EducationDetail> PreviousEducation { get; set; } = new List<EducationDetail>();
        public List<string> SelectedCourses { get; set; } = new List<string>();
        public string SportsDetails { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class EducationDetail
    {
        public string University { get; set; }
        public string EnrollmentNumber { get; set; }
        public string Center { get; set; }
        public string Stream { get; set; }
        public string Field { get; set; }
        public decimal MarksSecured { get; set; }
        public decimal OutOf { get; set; }
        public string ClassObtained { get; set; }
    }
}