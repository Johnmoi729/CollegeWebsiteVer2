using System;
using System.Collections.Generic;

namespace CollegeWebsite.Application.DTOs
{
    public class StudentDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string ResidentialAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string AdmissionStatus { get; set; }
        public string RegistrationNumber { get; set; }
        public List<EducationDetailDto> PreviousEducation { get; set; }
        public List<string> SelectedCourses { get; set; }
        public string SportsDetails { get; set; }
    }

    public class EducationDetailDto
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

    public class CreateStudentDto
    {
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string ResidentialAddress { get; set; }
        public string PermanentAddress { get; set; }
        public List<EducationDetailDto> PreviousEducation { get; set; }
        public List<string> SelectedCourses { get; set; }
        public string SportsDetails { get; set; }
    }

    public class UpdateStudentDto
    {
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string ResidentialAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string AdmissionStatus { get; set; }
        public List<EducationDetailDto> PreviousEducation { get; set; }
        public List<string> SelectedCourses { get; set; }
        public string SportsDetails { get; set; }
    }
}