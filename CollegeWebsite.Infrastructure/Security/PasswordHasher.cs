using CollegeWebsite.Application.Interfaces.Security;
using System;
using System.Security.Cryptography;
using System.Text;

namespace CollegeWebsite.Infrastructure.Security
{
    public class PasswordHasher : IPasswordHasher
    {
        public void CreatePasswordHash(string password, out string passwordHash, out string salt)
        {
            using var hmac = new HMACSHA512();
            salt = Convert.ToBase64String(hmac.Key);
            passwordHash = Convert.ToBase64String(
                hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        public bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            using var hmac = new HMACSHA512(saltBytes);
            var computedHash = Convert.ToBase64String(
                hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
            return computedHash == storedHash;
        }
    }
}
