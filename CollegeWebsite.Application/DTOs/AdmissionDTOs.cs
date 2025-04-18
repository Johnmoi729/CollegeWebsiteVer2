using System;
using System.Collections.Generic;

namespace CollegeWebsite.Application.DTOs
{
    public class AdmissionApplicationDto
    {
        // Personal details
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string ResidentialAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        // Educational background
        public List<EducationDetailDto> PreviousEducation { get; set; }

        // Course preferences
        public List<string> SelectedCourses { get; set; }

        // Additional information
        public string SportsDetails { get; set; }
        public string OtherActivities { get; set; }
    }

    public class AdmissionStatusDto
    {
        public string RegistrationNumber { get; set; }
        public string StudentName { get; set; }
        public string Status { get; set; } // Waiting, Under Review, Accepted, Rejected
        public DateTime ApplicationDate { get; set; }
        public string Comments { get; set; }
        public List<RequiredDocumentDto> RequiredDocuments { get; set; }
    }

    public class RequiredDocumentDto
    {
        public string DocumentType { get; set; } // e.g., "Birth Certificate", "High School Certificate"
        public bool IsSubmitted { get; set; }
        public DateTime? SubmissionDate { get; set; }
    }

    public class DocumentUploadDto
    {
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public byte[] FileContent { get; set; }
    }
}