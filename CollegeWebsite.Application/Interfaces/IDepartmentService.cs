using CollegeWebsite.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IDepartmentService
    {
        Task<IEnumerable<DepartmentDto>> GetAllDepartmentsAsync();
        Task<DepartmentDto> GetDepartmentByIdAsync(string id);
        Task<DepartmentDto> CreateDepartmentAsync(CreateDepartmentDto createDepartmentDto);
        Task<bool> UpdateDepartmentAsync(string id, UpdateDepartmentDto updateDepartmentDto);
        Task<bool> DeleteDepartmentAsync(string id);
    }
}