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
    public class FacilityService : IFacilityService
    {
        private readonly IFacilityRepository _facilityRepository;
        private readonly IMapper _mapper;

        public FacilityService(IFacilityRepository facilityRepository, IMapper mapper)
        {
            _facilityRepository = facilityRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FacilityDto>> GetAllFacilitiesAsync()
        {
            var facilities = await _facilityRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<FacilityDto>>(facilities);
        }

        public async Task<FacilityDto> GetFacilityByIdAsync(string id)
        {
            var facility = await _facilityRepository.GetByIdAsync(id);
            return _mapper.Map<FacilityDto>(facility);
        }

        public async Task<IEnumerable<FacilityDto>> GetFacilitiesByTypeAsync(string type)
        {
            var facilities = await _facilityRepository.GetFacilitiesByTypeAsync(type);
            return _mapper.Map<IEnumerable<FacilityDto>>(facilities);
        }

        public async Task<FacilityDto> CreateFacilityAsync(CreateFacilityDto createFacilityDto)
        {
            var facility = _mapper.Map<Facility>(createFacilityDto);
            facility.CreatedAt = DateTime.UtcNow;
            facility.UpdatedAt = DateTime.UtcNow;

            var createdFacility = await _facilityRepository.AddAsync(facility);
            return _mapper.Map<FacilityDto>(createdFacility);
        }

        public async Task<bool> UpdateFacilityAsync(string id, UpdateFacilityDto updateFacilityDto)
        {
            var existingFacility = await _facilityRepository.GetByIdAsync(id);
            if (existingFacility == null)
                return false;

            _mapper.Map(updateFacilityDto, existingFacility);
            existingFacility.UpdatedAt = DateTime.UtcNow;

            return await _facilityRepository.UpdateAsync(id, existingFacility);
        }

        public async Task<bool> DeleteFacilityAsync(string id)
        {
            return await _facilityRepository.DeleteAsync(id);
        }
    }
}