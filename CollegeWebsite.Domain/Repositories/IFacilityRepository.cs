using CollegeWebsite.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IFacilityRepository : IRepositoryBase<Facility>
    {
        Task<IEnumerable<Facility>> GetFacilitiesByTypeAsync(string type);
    }
}