using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CollegeWebsite.Domain.Entities
{
    public class Document
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("studentId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string StudentId { get; set; }

        [BsonElement("documentType")]
        public string DocumentType { get; set; }

        [BsonElement("documentName")]
        public string DocumentName { get; set; }

        [BsonElement("fileContent")]
        public byte[] FileContent { get; set; }

        [BsonElement("isSubmitted")]
        public bool IsSubmitted { get; set; }

        [BsonElement("submissionDate")]
        public DateTime? SubmissionDate { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}