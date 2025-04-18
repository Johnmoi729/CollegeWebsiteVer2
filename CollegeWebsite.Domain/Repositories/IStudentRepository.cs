using CollegeWebsite.Domain.Entities;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IStudentRepository : IRepositoryBase<Student>
    {
        Task<Student> GetByRegistrationNumberAsync(string registrationNumber);
        Task<bool> IsRegistrationNumberUniqueAsync(string registrationNumber);

        // Also add this method to IStudentRepository.cs interface
        Task<long> CountByStatusAsync(string status);
    }
}