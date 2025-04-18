// CollegeWebsite.Domain/Repositories/ICourseRepository.cs (Updated)
using CollegeWebsite.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface ICourseRepository : IRepositoryBase<Course>
    {
        Task<IEnumerable<Course>> GetCoursesByDepartmentAsync(string departmentId);
        Task<IEnumerable<Course>> GetCoursesByIdsAsync(IEnumerable<string> courseIds);
    }
}
