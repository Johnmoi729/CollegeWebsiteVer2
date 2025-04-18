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
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Department> _collection;

        public DepartmentRepository(MongoDbContext context)
        {
            _context = context;
            _collection = context.Departments;
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Department> GetByIdAsync(string id)
        {
            return await _collection.Find(d => d.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Department>> FindAsync(Expression<Func<Department, bool>> expression)
        {
            return await _collection.Find(expression).ToListAsync();
        }

        public async Task<Department> AddAsync(Department entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> UpdateAsync(string id, Department entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _collection.ReplaceOneAsync(d => d.Id == id, entity);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(d => d.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<long> CountAsync()
        {
            return await _collection.CountDocumentsAsync(_ => true);
        }

        public async Task<bool> ExistsAsync(Expression<Func<Department, bool>> expression)
        {
            return await _collection.Find(expression).AnyAsync();
        }
    }
}