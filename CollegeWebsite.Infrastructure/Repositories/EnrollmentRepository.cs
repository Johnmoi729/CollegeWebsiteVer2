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
    public class EnrollmentRepository : IEnrollmentRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Enrollment> _collection;

        public EnrollmentRepository(MongoDbContext context)
        {
            _context = context;
            _collection = context.Enrollments;
        }

        public async Task<IEnumerable<Enrollment>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Enrollment> GetByIdAsync(string id)
        {
            return await _collection.Find(e => e.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Enrollment>> FindAsync(Expression<Func<Enrollment, bool>> expression)
        {
            return await _collection.Find(expression).ToListAsync();
        }

        public async Task<Enrollment> AddAsync(Enrollment entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> UpdateAsync(string id, Enrollment entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _collection.ReplaceOneAsync(e => e.Id == id, entity);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(e => e.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<long> CountAsync()
        {
            return await _collection.CountDocumentsAsync(_ => true);
        }

        public async Task<bool> ExistsAsync(Expression<Func<Enrollment, bool>> expression)
        {
            return await _collection.Find(expression).AnyAsync();
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByStudentIdAsync(string studentId)
        {
            return await _collection.Find(e => e.StudentId == studentId).ToListAsync();
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAsync(string courseId)
        {
            return await _collection.Find(e => e.CourseId == courseId).ToListAsync();
        }

        public async Task<Enrollment> GetEnrollmentAsync(string studentId, string courseId)
        {
            return await _collection.Find(e => e.StudentId == studentId && e.CourseId == courseId).FirstOrDefaultAsync();
        }
    }
}