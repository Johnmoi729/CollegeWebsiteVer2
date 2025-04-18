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
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public StudentService(IStudentRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<StudentDto>> GetAllStudentsAsync()
        {
            var students = await _studentRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<StudentDto>>(students);
        }

        public async Task<StudentDto> GetStudentByIdAsync(string id)
        {
            var student = await _studentRepository.GetByIdAsync(id);
            return _mapper.Map<StudentDto>(student);
        }

        public async Task<StudentDto> GetStudentByRegistrationNumberAsync(string registrationNumber)
        {
            var student = await _studentRepository.GetByRegistrationNumberAsync(registrationNumber);
            return _mapper.Map<StudentDto>(student);
        }

        public async Task<StudentDto> CreateStudentAsync(CreateStudentDto createStudentDto)
        {
            var student = _mapper.Map<Student>(createStudentDto);
            student.RegistrationNumber = await GenerateUniqueRegistrationNumberAsync();
            student.AdmissionStatus = "Waiting";
            student.CreatedAt = DateTime.UtcNow;
            student.UpdatedAt = DateTime.UtcNow;

            var createdStudent = await _studentRepository.AddAsync(student);
            return _mapper.Map<StudentDto>(createdStudent);
        }

        public async Task<bool> UpdateStudentAsync(string id, UpdateStudentDto updateStudentDto)
        {
            var existingStudent = await _studentRepository.GetByIdAsync(id);
            if (existingStudent == null)
                return false;

            _mapper.Map(updateStudentDto, existingStudent);
            existingStudent.UpdatedAt = DateTime.UtcNow;

            return await _studentRepository.UpdateAsync(id, existingStudent);
        }

        public async Task<bool> DeleteStudentAsync(string id)
        {
            return await _studentRepository.DeleteAsync(id);
        }

        public async Task<string> GenerateUniqueRegistrationNumberAsync()
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

        public async Task<bool> UpdateAdmissionStatusAsync(string id, string status)
        {
            var student = await _studentRepository.GetByIdAsync(id);
            if (student == null)
                return false;

            student.AdmissionStatus = status;
            student.UpdatedAt = DateTime.UtcNow;

            return await _studentRepository.UpdateAsync(id, student);
        }
    }
}