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
    public class FacultyController : ControllerBase
    {
        private readonly IFacultyService _facultyService;

        public FacultyController(IFacultyService facultyService)
        {
            _facultyService = facultyService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FacultyDto>>> GetAll()
        {
            var faculty = await _facultyService.GetAllFacultyAsync();
            return Ok(faculty);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FacultyDto>> GetById(string id)
        {
            var faculty = await _facultyService.GetFacultyByIdAsync(id);
            if (faculty == null)
                return NotFound();

            return Ok(faculty);
        }

        [HttpGet("department/{departmentId}")]
        public async Task<ActionResult<IEnumerable<FacultyDto>>> GetByDepartment(string departmentId)
        {
            var faculty = await _facultyService.GetFacultyByDepartmentAsync(departmentId);
            return Ok(faculty);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FacultyDto>> Create(CreateFacultyDto createFacultyDto)
        {
            var createdFaculty = await _facultyService.CreateFacultyAsync(createFacultyDto);
            return CreatedAtAction(nameof(GetById), new { id = createdFaculty.Id }, createdFaculty);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(string id, UpdateFacultyDto updateFacultyDto)
        {
            var result = await _facultyService.UpdateFacultyAsync(id, updateFacultyDto);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _facultyService.DeleteFacultyAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}