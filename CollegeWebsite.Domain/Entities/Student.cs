using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CollegeWebsite.Domain.Entities
{
    public class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("fatherName")]
        public string FatherName { get; set; }

        [BsonElement("motherName")]
        public string MotherName { get; set; }

        [BsonElement("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [BsonElement("gender")]
        public string Gender { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; }

        [BsonElement("residentialAddress")]
        public string ResidentialAddress { get; set; }

        [BsonElement("permanentAddress")]
        public string PermanentAddress { get; set; }

        [BsonElement("admissionStatus")]
        public string AdmissionStatus { get; set; }

        [BsonElement("registrationNumber")]
        public string RegistrationNumber { get; set; }

        [BsonElement("previousEducation")]
        public List<EducationDetail> PreviousEducation { get; set; } = new List<EducationDetail>();

        [BsonElement("selectedCourses")]
        public List<string> SelectedCourses { get; set; } = new List<string>();

        [BsonElement("sportsDetails")]
        public string SportsDetails { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class EducationDetail
    {
        [BsonElement("university")]
        public string University { get; set; }

        [BsonElement("enrollmentNumber")]
        public string EnrollmentNumber { get; set; }

        [BsonElement("center")]
        public string Center { get; set; }

        [BsonElement("stream")]
        public string Stream { get; set; }

        [BsonElement("field")]
        public string Field { get; set; }

        [BsonElement("marksSecured")]
        public decimal MarksSecured { get; set; }

        [BsonElement("outOf")]
        public decimal OutOf { get; set; }

        [BsonElement("classObtained")]
        public string ClassObtained { get; set; }
    }
}