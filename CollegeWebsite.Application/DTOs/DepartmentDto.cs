using System.Collections.Generic;

namespace CollegeWebsite.Application.DTOs
{
    public class DepartmentDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string HeadOfDepartmentId { get; set; }
        public List<string> FacultyIds { get; set; }
    }

    public class CreateDepartmentDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string HeadOfDepartmentId { get; set; }
        public List<string> FacultyIds { get; set; }
    }

    public class UpdateDepartmentDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string HeadOfDepartmentId { get; set; }
        public List<string> FacultyIds { get; set; }
    }
}