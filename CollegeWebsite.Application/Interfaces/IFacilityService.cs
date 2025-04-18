using CollegeWebsite.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IFacilityService
    {
        Task<IEnumerable<FacilityDto>> GetAllFacilitiesAsync();
        Task<FacilityDto> GetFacilityByIdAsync(string id);
        Task<IEnumerable<FacilityDto>> GetFacilitiesByTypeAsync(string type);
        Task<FacilityDto> CreateFacilityAsync(CreateFacilityDto createFacilityDto);
        Task<bool> UpdateFacilityAsync(string id, UpdateFacilityDto updateFacilityDto);
        Task<bool> DeleteFacilityAsync(string id);
    }
}