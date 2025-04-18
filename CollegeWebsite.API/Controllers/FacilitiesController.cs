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
    public class FacilitiesController : ControllerBase
    {
        private readonly IFacilityService _facilityService;

        public FacilitiesController(IFacilityService facilityService)
        {
            _facilityService = facilityService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FacilityDto>>> GetAll()
        {
            var facilities = await _facilityService.GetAllFacilitiesAsync();
            return Ok(facilities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FacilityDto>> GetById(string id)
        {
            var facility = await _facilityService.GetFacilityByIdAsync(id);
            if (facility == null)
                return NotFound();

            return Ok(facility);
        }

        [HttpGet("type/{type}")]
        public async Task<ActionResult<IEnumerable<FacilityDto>>> GetByType(string type)
        {
            var facilities = await _facilityService.GetFacilitiesByTypeAsync(type);
            return Ok(facilities);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FacilityDto>> Create(CreateFacilityDto createFacilityDto)
        {
            var createdFacility = await _facilityService.CreateFacilityAsync(createFacilityDto);
            return CreatedAtAction(nameof(GetById), new { id = createdFacility.Id }, createdFacility);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(string id, UpdateFacilityDto updateFacilityDto)
        {
            var result = await _facilityService.UpdateFacilityAsync(id, updateFacilityDto);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _facilityService.DeleteFacilityAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}