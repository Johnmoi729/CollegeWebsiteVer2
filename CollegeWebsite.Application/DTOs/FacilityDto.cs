namespace CollegeWebsite.Application.DTOs
{
    public class FacilityDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateFacilityDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
    }

    public class UpdateFacilityDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }
    }
}