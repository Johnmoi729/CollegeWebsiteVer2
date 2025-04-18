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
    public class CourseRepository : ICourseRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Course> _collection;

        public CourseRepository(MongoDbContext context)
        {
            _context = context;
            _collection = context.Courses;
        }

        public async Task<IEnumerable<Course>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Course> GetByIdAsync(string id)
        {
            return await _collection.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Course>> FindAsync(Expression<Func<Course, bool>> expression)
        {
            return await _collection.Find(expression).ToListAsync();
        }

        public async Task<Course> AddAsync(Course entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> UpdateAsync(string id, Course entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _collection.ReplaceOneAsync(c => c.Id == id, entity);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(c => c.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<long> CountAsync()
        {
            return await _collection.CountDocumentsAsync(_ => true);
        }

        public async Task<bool> ExistsAsync(Expression<Func<Course, bool>> expression)
        {
            return await _collection.Find(expression).AnyAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesByDepartmentAsync(string departmentId)
        {
            return await _collection.Find(c => c.DepartmentId == departmentId).ToListAsync();
        }

        //(Updated method)
        public async Task<IEnumerable<Course>> GetCoursesByIdsAsync(IEnumerable<string> courseIds)
        {
            return await _collection.Find(c => courseIds.Contains(c.Id)).ToListAsync();
        }
    }
}