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
    public class FacultyRepository : IFacultyRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Faculty> _collection;

        public FacultyRepository(MongoDbContext context)
        {
            _context = context;
            _collection = context.Faculty;
        }

        public async Task<IEnumerable<Faculty>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Faculty> GetByIdAsync(string id)
        {
            return await _collection.Find(f => f.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Faculty>> FindAsync(Expression<Func<Faculty, bool>> expression)
        {
            return await _collection.Find(expression).ToListAsync();
        }

        public async Task<Faculty> AddAsync(Faculty entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> UpdateAsync(string id, Faculty entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _collection.ReplaceOneAsync(f => f.Id == id, entity);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(f => f.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<long> CountAsync()
        {
            return await _collection.CountDocumentsAsync(_ => true);
        }

        public async Task<bool> ExistsAsync(Expression<Func<Faculty, bool>> expression)
        {
            return await _collection.Find(expression).AnyAsync();
        }

        public async Task<IEnumerable<Faculty>> GetFacultyByDepartmentAsync(string departmentId)
        {
            return await _collection.Find(f => f.DepartmentId == departmentId).ToListAsync();
        }
    }
}