using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<FeedbackDto>>> GetAll()
        {
            var feedback = await _feedbackService.GetAllFeedbackAsync();
            return Ok(feedback);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FeedbackDto>> GetById(string id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (feedback == null)
                return NotFound();

            return Ok(feedback);
        }

        [HttpGet("unread-count")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<long>> GetUnreadCount()
        {
            var count = await _feedbackService.GetUnreadFeedbackCountAsync();
            return Ok(count);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<FeedbackDto>> Create(CreateFeedbackDto createFeedbackDto)
        {
            var createdFeedback = await _feedbackService.CreateFeedbackAsync(createFeedbackDto);
            return CreatedAtAction(nameof(GetById), new { id = createdFeedback.Id }, createdFeedback);
        }

        [HttpPatch("{id}/mark-as-read")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> MarkAsRead(string id)
        {
            var result = await _feedbackService.MarkFeedbackAsReadAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _feedbackService.DeleteFeedbackAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}