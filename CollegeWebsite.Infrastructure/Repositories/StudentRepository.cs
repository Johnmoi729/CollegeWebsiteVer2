using CollegeWebsite.Domain.Entities;
using CollegeWebsite.Domain.Repositories;
using CollegeWebsite.Infrastructure.Data;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CollegeWebsite.Infrastructure.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Student> _collection;

        public StudentRepository(MongoDbContext context)
        {
            _context = context;
            _collection = context.Students;
        }

        public async Task<IEnumerable<Student>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Student> GetByIdAsync(string id)
        {
            return await _collection.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Student>> FindAsync(Expression<Func<Student, bool>> expression)
        {
            return await _collection.Find(expression).ToListAsync();
        }

        public async Task<Student> AddAsync(Student entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> UpdateAsync(string id, Student entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _collection.ReplaceOneAsync(s => s.Id == id, entity);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(s => s.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<long> CountAsync()
        {
            return await _collection.CountDocumentsAsync(_ => true);
        }

        public async Task<bool> ExistsAsync(Expression<Func<Student, bool>> expression)
        {
            return await _collection.Find(expression).AnyAsync();
        }

        public async Task<Student> GetByRegistrationNumberAsync(string registrationNumber)
        {
            return await _collection.Find(s => s.RegistrationNumber == registrationNumber).FirstOrDefaultAsync();
        }

        public async Task<bool> IsRegistrationNumberUniqueAsync(string registrationNumber)
        {
            return !await _collection.Find(s => s.RegistrationNumber == registrationNumber).AnyAsync();
        }

        // Add this method to StudentRepository.cs
        public async Task<long> CountByStatusAsync(string status)
        {
            return await _collection.CountDocumentsAsync(s => s.AdmissionStatus == status);
        }
    }
}