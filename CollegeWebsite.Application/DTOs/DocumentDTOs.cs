using System;

namespace CollegeWebsite.Application.DTOs
{
    public class DocumentDto
    {
        public string Id { get; set; }
        public string StudentId { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public bool IsSubmitted { get; set; }
        public DateTime? SubmissionDate { get; set; }
    }

    public class DocumentDetailsDto : DocumentDto
    {
        public byte[] FileContent { get; set; }
    }
}