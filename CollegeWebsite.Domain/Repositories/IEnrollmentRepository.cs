using CollegeWebsite.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IEnrollmentRepository : IRepositoryBase<Enrollment>
    {
        Task<IEnumerable<Enrollment>> GetEnrollmentsByStudentIdAsync(string studentId);
        Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAsync(string courseId);
        Task<Enrollment> GetEnrollmentAsync(string studentId, string courseId);
    }
}