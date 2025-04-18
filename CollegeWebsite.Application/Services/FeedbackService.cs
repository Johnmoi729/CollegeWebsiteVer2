using AutoMapper;
using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using CollegeWebsite.Domain.Entities;
using CollegeWebsite.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IMapper _mapper;

        public FeedbackService(IFeedbackRepository feedbackRepository, IMapper mapper)
        {
            _feedbackRepository = feedbackRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FeedbackDto>> GetAllFeedbackAsync()
        {
            var feedback = await _feedbackRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<FeedbackDto>>(feedback);
        }

        public async Task<FeedbackDto> GetFeedbackByIdAsync(string id)
        {
            var feedback = await _feedbackRepository.GetByIdAsync(id);
            return _mapper.Map<FeedbackDto>(feedback);
        }

        public async Task<FeedbackDto> CreateFeedbackAsync(CreateFeedbackDto createFeedbackDto)
        {
            var feedback = _mapper.Map<Feedback>(createFeedbackDto);
            feedback.SubmittedAt = DateTime.UtcNow;
            feedback.IsRead = false;

            var createdFeedback = await _feedbackRepository.AddAsync(feedback);
            return _mapper.Map<FeedbackDto>(createdFeedback);
        }

        public async Task<bool> MarkFeedbackAsReadAsync(string id)
        {
            return await _feedbackRepository.MarkAsReadAsync(id);
        }

        public async Task<bool> DeleteFeedbackAsync(string id)
        {
            return await _feedbackRepository.DeleteAsync(id);
        }

        public async Task<long> GetUnreadFeedbackCountAsync()
        {
            return await _feedbackRepository.CountUnreadAsync();
        }
    }
}