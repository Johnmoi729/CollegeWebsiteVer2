using CollegeWebsite.Application.DTOs;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IAdmissionService
    {
        Task<StudentDto> SubmitAdmissionApplicationAsync(AdmissionApplicationDto applicationDto);
        Task<AdmissionStatusDto> CheckAdmissionStatusAsync(string registrationNumber);
        Task<bool> CancelAdmissionApplicationAsync(string registrationNumber);
        Task<bool> UploadDocumentsAsync(string studentId, DocumentUploadDto documentDto);
    }
}