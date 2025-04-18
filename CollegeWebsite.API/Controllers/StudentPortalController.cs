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
    [Authorize]
    public class StudentPortalController : ControllerBase
    {
        private readonly IStudentPortalService _studentPortalService;

        public StudentPortalController(IStudentPortalService studentPortalService)
        {
            _studentPortalService = studentPortalService;
        }

        [HttpGet("{studentId}")]
        public async Task<ActionResult<StudentPortalDto>> GetPortalData(string studentId)
        {
            var portalData = await _studentPortalService.GetStudentPortalDataAsync(studentId);
            if (portalData == null)
                return NotFound();

            return Ok(portalData);
        }

        [HttpPut("profile/{studentId}")]
        public async Task<IActionResult> UpdateProfile(string studentId, UpdateStudentProfileDto profileDto)
        {
            var result = await _studentPortalService.UpdateStudentProfileAsync(studentId, profileDto);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("courses/{studentId}")]
        public async Task<ActionResult<List<EnrolledCourseDto>>> GetEnrolledCourses(string studentId)
        {
            var courses = await _studentPortalService.GetEnrolledCoursesAsync(studentId);
            return Ok(courses);
        }

        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollInCourse(string studentId, string courseId)
        {
            var result = await _studentPortalService.EnrollInCourseAsync(studentId, courseId);
            if (!result)
                return BadRequest("Enrollment failed");

            return Ok();
        }

        [HttpPost("drop")]
        public async Task<IActionResult> DropCourse(string studentId, string courseId)
        {
            var result = await _studentPortalService.DropCourseAsync(studentId, courseId);
            if (!result)
                return BadRequest("Course drop failed");

            return Ok();
        }
    }
}