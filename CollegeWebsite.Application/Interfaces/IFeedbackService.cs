using CollegeWebsite.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IFeedbackService
    {
        Task<IEnumerable<FeedbackDto>> GetAllFeedbackAsync();
        Task<FeedbackDto> GetFeedbackByIdAsync(string id);
        Task<FeedbackDto> CreateFeedbackAsync(CreateFeedbackDto createFeedbackDto);
        Task<bool> MarkFeedbackAsReadAsync(string id);
        Task<bool> DeleteFeedbackAsync(string id);
        Task<long> GetUnreadFeedbackCountAsync();
    }
}