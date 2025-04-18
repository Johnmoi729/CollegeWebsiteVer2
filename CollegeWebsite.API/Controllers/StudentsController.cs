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
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetAll()
        {
            var students = await _studentService.GetAllStudentsAsync();
            return Ok(students);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<StudentDto>> GetById(string id)
        {
            var student = await _studentService.GetStudentByIdAsync(id);
            if (student == null)
                return NotFound();

            return Ok(student);
        }

        [HttpGet("registration/{registrationNumber}")]
        [Authorize]
        public async Task<ActionResult<StudentDto>> GetByRegistrationNumber(string registrationNumber)
        {
            var student = await _studentService.GetStudentByRegistrationNumberAsync(registrationNumber);
            if (student == null)
                return NotFound();

            return Ok(student);
        }

        [HttpPost]
        [AllowAnonymous] // Allow anonymous for student registration
        public async Task<ActionResult<StudentDto>> Create(CreateStudentDto createStudentDto)
        {
            var createdStudent = await _studentService.CreateStudentAsync(createStudentDto);
            return CreatedAtAction(nameof(GetById), new { id = createdStudent.Id }, createdStudent);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(string id, UpdateStudentDto updateStudentDto)
        {
            var result = await _studentService.UpdateStudentAsync(id, updateStudentDto);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpPatch("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(string id, [FromBody] string status)
        {
            var result = await _studentService.UpdateAdmissionStatusAsync(id, status);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _studentService.DeleteStudentAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}