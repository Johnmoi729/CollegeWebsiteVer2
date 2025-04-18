using CollegeWebsite.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IFacultyService
    {
        Task<IEnumerable<FacultyDto>> GetAllFacultyAsync();
        Task<FacultyDto> GetFacultyByIdAsync(string id);
        Task<IEnumerable<FacultyDto>> GetFacultyByDepartmentAsync(string departmentId);
        Task<FacultyDto> CreateFacultyAsync(CreateFacultyDto createFacultyDto);
        Task<bool> UpdateFacultyAsync(string id, UpdateFacultyDto updateFacultyDto);
        Task<bool> DeleteFacultyAsync(string id);
    }
}