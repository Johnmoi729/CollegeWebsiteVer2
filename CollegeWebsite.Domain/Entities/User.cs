using System;
using System.Collections.Generic;

namespace CollegeWebsite.Domain.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
        public bool IsActive { get; set; } = true;
        public DateTime LastLogin { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}