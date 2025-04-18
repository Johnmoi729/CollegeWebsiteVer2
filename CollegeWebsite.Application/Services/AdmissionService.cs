using AutoMapper;
using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using CollegeWebsite.Domain.Entities;
using CollegeWebsite.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Services
{
    public class AdmissionService : IAdmissionService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IDocumentRepository _documentRepository; // You'll need to create this
        private readonly IMapper _mapper;

        public AdmissionService(
            IStudentRepository studentRepository,
            IDocumentRepository documentRepository,
            IMapper mapper)
        {
            _studentRepository = studentRepository;
            _documentRepository = documentRepository;
            _mapper = mapper;
        }

        public async Task<StudentDto> SubmitAdmissionApplicationAsync(AdmissionApplicationDto applicationDto)
        {
            // Map application to student
            var student = new Student
            {
                Name = applicationDto.Name,
                FatherName = applicationDto.FatherName,
                MotherName = applicationDto.MotherName,
                DateOfBirth = applicationDto.DateOfBirth,
                Gender = applicationDto.Gender,
                ResidentialAddress = applicationDto.ResidentialAddress,
                PermanentAddress = applicationDto.PermanentAddress,
                PreviousEducation = _mapper.Map<List<EducationDetail>>(applicationDto.PreviousEducation),
                SelectedCourses = applicationDto.SelectedCourses,
                SportsDetails = applicationDto.SportsDetails,
                AdmissionStatus = "Waiting",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            // Generate registration number
            student.RegistrationNumber = await GenerateUniqueRegistrationNumberAsync();

            // Save student to database
            var createdStudent = await _studentRepository.AddAsync(student);

            // Return mapped DTO
            return _mapper.Map<StudentDto>(createdStudent);
        }

        public async Task<AdmissionStatusDto> CheckAdmissionStatusAsync(string registrationNumber)
        {
            var student = await _studentRepository.GetByRegistrationNumberAsync(registrationNumber);
            if (student == null)
                return null;

            // Get required documents
            var documents = await _documentRepository.GetDocumentsByStudentIdAsync(student.Id);

            // Map to status DTO
            var statusDto = new AdmissionStatusDto
            {
                RegistrationNumber = student.RegistrationNumber,
                StudentName = student.Name,
                Status = student.AdmissionStatus,
                ApplicationDate = student.CreatedAt,
                RequiredDocuments = documents.Select(d => new RequiredDocumentDto
                {
                    DocumentType = d.DocumentType,
                    IsSubmitted = d.IsSubmitted,
                    SubmissionDate = d.SubmissionDate
                }).ToList()
            };

            return statusDto;
        }

        public async Task<bool> CancelAdmissionApplicationAsync(string registrationNumber)
        {
            var student = await _studentRepository.GetByRegistrationNumberAsync(registrationNumber);
            if (student == null)
                return false;

            if (student.AdmissionStatus == "Accepted")
                return false; // Cannot cancel an accepted application

            return await _studentRepository.DeleteAsync(student.Id);
        }

        public async Task<bool> UploadDocumentsAsync(string studentId, DocumentUploadDto documentDto)
        {
            var student = await _studentRepository.GetByIdAsync(studentId);
            if (student == null)
                return false;

            // Create document entity
            var document = new Document
            {
                StudentId = studentId,
                DocumentType = documentDto.DocumentType,
                DocumentName = documentDto.DocumentName,
                FileContent = documentDto.FileContent,
                IsSubmitted = true,
                SubmissionDate = DateTime.UtcNow
            };

            // Save document to database
            await _documentRepository.AddAsync(document);
            return true;
        }

        private async Task<string> GenerateUniqueRegistrationNumberAsync()
        {
            var year = DateTime.UtcNow.Year.ToString();
            var count = await _studentRepository.CountAsync();
            var number = (count + 1).ToString("D4");

            var registrationNumber = $"ITM{year}{number}";

            while (!await _studentRepository.IsRegistrationNumberUniqueAsync(registrationNumber))
            {
                count++;
                number = count.ToString("D4");
                registrationNumber = $"ITM{year}{number}";
            }

            return registrationNumber;
        }
    }
}