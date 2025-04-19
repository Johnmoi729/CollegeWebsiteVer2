using System;
using System.Text;
using System.Security.Cryptography;
using CollegeWebsite.Application.Interfaces.Security;

namespace CollegeWebsite.Infrastructure.Security
{
    public class PasswordHasher : IPasswordHasher
    {
        public void CreatePasswordHash(string password, out string passwordHash, out string salt)
        {
            // Generate a random salt
            using var hmac = new HMACSHA512();
            salt = Convert.ToBase64String(hmac.Key);
            passwordHash = Convert.ToBase64String(
                hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        public bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            try
            {
                // Try to convert the salt from Base64
                var saltBytes = Convert.FromBase64String(storedSalt);

                using var hmac = new HMACSHA512(saltBytes);
                var computedHash = Convert.ToBase64String(
                    hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));

                return computedHash == storedHash;
            }
            catch (FormatException)
            {
                // If the stored salt isn't valid Base64, log and return false
                Console.WriteLine($"Invalid Base64 format for salt: {storedSalt}");
                return false;
            }
            catch (Exception ex)
            {
                // Log any other exceptions
                Console.WriteLine($"Error verifying password: {ex.Message}");
                return false;
            }
        }
    }
}