using CollegeWebsite.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IFacultyRepository : IRepositoryBase<Faculty>
    {
        Task<IEnumerable<Faculty>> GetFacultyByDepartmentAsync(string departmentId);
    }
}