using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CollegeWebsite.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdmissionController : ControllerBase
    {
        private readonly IAdmissionService _admissionService;

        public AdmissionController(IAdmissionService admissionService)
        {
            _admissionService = admissionService;
        }

        [HttpPost("apply")]
        [AllowAnonymous]
        public async Task<ActionResult<StudentDto>> Apply(AdmissionApplicationDto applicationDto)
        {
            var result = await _admissionService.SubmitAdmissionApplicationAsync(applicationDto);
            return CreatedAtAction(nameof(CheckStatus), new { registrationNumber = result.RegistrationNumber }, result);
        }

        [HttpGet("status/{registrationNumber}")]
        [AllowAnonymous]
        public async Task<ActionResult<AdmissionStatusDto>> CheckStatus(string registrationNumber)
        {
            var status = await _admissionService.CheckAdmissionStatusAsync(registrationNumber);
            if (status == null)
                return NotFound();

            return Ok(status);
        }

        [HttpDelete("cancel/{registrationNumber}")]
        [AllowAnonymous]
        public async Task<IActionResult> Cancel(string registrationNumber)
        {
            var result = await _admissionService.CancelAdmissionApplicationAsync(registrationNumber);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpPost("upload-documents/{studentId}")]
        [Authorize]
        public async Task<IActionResult> UploadDocuments(string studentId, DocumentUploadDto documentDto)
        {
            var result = await _admissionService.UploadDocumentsAsync(studentId, documentDto);
            if (!result)
                return NotFound();

            return Ok();
        }
    }
}