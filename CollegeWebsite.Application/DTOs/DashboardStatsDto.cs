namespace CollegeWebsite.Application.DTOs
{
    public class DashboardStatsDto
    {
        public int TotalStudents { get; set; }
        public int TotalCourses { get; set; }
        public int TotalFaculty { get; set; }
        public int TotalDepartments { get; set; }
        public int PendingAdmissions { get; set; }
        public int UnreadFeedback { get; set; }
    }
}