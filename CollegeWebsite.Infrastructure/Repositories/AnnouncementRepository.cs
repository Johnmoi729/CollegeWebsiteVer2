// CollegeWebsite.Infrastructure/Repositories/AnnouncementRepository.cs
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
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Announcement> _collection;

        public AnnouncementRepository(MongoDbContext context)
        {
            _context = context;
            _collection = context.Announcements;
        }

        public async Task<IEnumerable<Announcement>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Announcement> GetByIdAsync(string id)
        {
            return await _collection.Find(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Announcement>> FindAsync(Expression<Func<Announcement, bool>> expression)
        {
            return await _collection.Find(expression).ToListAsync();
        }

        public async Task<Announcement> AddAsync(Announcement entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> UpdateAsync(string id, Announcement entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _collection.ReplaceOneAsync(a => a.Id == id, entity);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(a => a.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<long> CountAsync()
        {
            return await _collection.CountDocumentsAsync(_ => true);
        }

        public async Task<bool> ExistsAsync(Expression<Func<Announcement, bool>> expression)
        {
            return await _collection.Find(expression).AnyAsync();
        }

        public async Task<IEnumerable<Announcement>> GetLatestAnnouncementsAsync(int count)
        {
            return await _collection
                .Find(a => a.IsActive == true)
                .SortByDescending(a => a.PostedDate)
                .Limit(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<Announcement>> GetImportantAnnouncementsAsync()
        {
            return await _collection
                .Find(a => a.IsActive == true && a.IsImportant == true)
                .SortByDescending(a => a.PostedDate)
                .ToListAsync();
        }
    }
}