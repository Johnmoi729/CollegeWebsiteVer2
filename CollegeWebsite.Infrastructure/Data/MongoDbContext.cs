using CollegeWebsite.Domain.Entities;
using CollegeWebsite.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollegeWebsite.Infrastructure.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<Student> Students => _database.GetCollection<Student>("Students");
        public IMongoCollection<Course> Courses => _database.GetCollection<Course>("Courses");
        public IMongoCollection<Department> Departments => _database.GetCollection<Department>("Departments");
        public IMongoCollection<Faculty> Faculty => _database.GetCollection<Faculty>("Faculty");
        public IMongoCollection<Facility> Facilities => _database.GetCollection<Facility>("Facilities");
        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
        public IMongoCollection<Feedback> Feedback => _database.GetCollection<Feedback>("Feedback");
        public IMongoCollection<Document> Documents => _database.GetCollection<Document>("Documents");
        public IMongoCollection<Enrollment> Enrollments => _database.GetCollection<Enrollment>("Enrollments");
        public IMongoCollection<Announcement> Announcements => _database.GetCollection<Announcement>("Announcements");
    }
}