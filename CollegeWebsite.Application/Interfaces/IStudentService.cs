using CollegeWebsite.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDto>> GetAllStudentsAsync();
        Task<StudentDto> GetStudentByIdAsync(string id);
        Task<StudentDto> GetStudentByRegistrationNumberAsync(string registrationNumber);
        Task<StudentDto> CreateStudentAsync(CreateStudentDto createStudentDto);
        Task<bool> UpdateStudentAsync(string id, UpdateStudentDto updateStudentDto);
        Task<bool> DeleteStudentAsync(string id);
        Task<string> GenerateUniqueRegistrationNumberAsync();
        Task<bool> UpdateAdmissionStatusAsync(string id, string status);
    }
}