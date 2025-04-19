using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CollegeWebsite.Domain.Entities
{
    public class Enrollment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("studentId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string StudentId { get; set; }

        [BsonElement("courseId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CourseId { get; set; }

        [BsonElement("instructorName")]
        public string InstructorName { get; set; }

        [BsonElement("enrollmentDate")]
        public DateTime EnrollmentDate { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("grade")]
        public decimal? Grade { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}