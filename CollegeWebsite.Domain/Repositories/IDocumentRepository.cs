using CollegeWebsite.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IDocumentRepository : IRepositoryBase<Document>
    {
        Task<IEnumerable<Document>> GetDocumentsByStudentIdAsync(string studentId);
        Task<Document> GetDocumentByTypeAndStudentIdAsync(string documentType, string studentId);
    }
}