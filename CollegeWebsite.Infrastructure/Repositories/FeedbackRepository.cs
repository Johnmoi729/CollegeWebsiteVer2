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
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Feedback> _collection;

        public FeedbackRepository(MongoDbContext context)
        {
            _context = context;
            _collection = context.Feedback;
        }

        public async Task<IEnumerable<Feedback>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Feedback> GetByIdAsync(string id)
        {
            return await _collection.Find(f => f.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Feedback>> FindAsync(Expression<Func<Feedback, bool>> expression)
        {
            return await _collection.Find(expression).ToListAsync();
        }

        public async Task<Feedback> AddAsync(Feedback entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> UpdateAsync(string id, Feedback entity)
        {
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

        public async Task<bool> ExistsAsync(Expression<Func<Feedback, bool>> expression)
        {
            return await _collection.Find(expression).AnyAsync();
        }

        public async Task<long> CountUnreadAsync()
        {
            return await _collection.CountDocumentsAsync(f => f.IsRead == false);
        }

        public async Task<bool> MarkAsReadAsync(string id)
        {
            var update = Builders<Feedback>.Update.Set(f => f.IsRead, true);
            var result = await _collection.UpdateOneAsync(f => f.Id == id, update);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
    }
}