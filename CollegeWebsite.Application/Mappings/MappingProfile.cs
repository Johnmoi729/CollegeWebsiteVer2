using AutoMapper;
using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Domain.Entities;

namespace CollegeWebsite.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Student mappings
            CreateMap<Student, StudentDto>();
            CreateMap<CreateStudentDto, Student>();
            CreateMap<UpdateStudentDto, Student>();
            CreateMap<EducationDetail, EducationDetailDto>().ReverseMap();

            // Course mappings
            CreateMap<Course, CourseDto>();
            CreateMap<CreateCourseDto, Course>();
            CreateMap<UpdateCourseDto, Course>();

            // Department mappings
            CreateMap<Department, DepartmentDto>();
            CreateMap<CreateDepartmentDto, Department>();
            CreateMap<UpdateDepartmentDto, Department>();

            // Faculty mappings
            CreateMap<Faculty, FacultyDto>();
            CreateMap<CreateFacultyDto, Faculty>();
            CreateMap<UpdateFacultyDto, Faculty>();

            // Facility mappings
            CreateMap<Facility, FacilityDto>();
            CreateMap<CreateFacilityDto, Facility>();
            CreateMap<UpdateFacilityDto, Facility>();

            // User mappings
            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();

            // Feedback mappings
            CreateMap<Feedback, FeedbackDto>();
            CreateMap<CreateFeedbackDto, Feedback>();
        }
    }
}