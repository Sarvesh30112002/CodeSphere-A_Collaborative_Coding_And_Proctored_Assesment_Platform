const crypto = require('crypto');

// Function to generate a random string (JWT secret)
const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate a random string with 32 characters (256 bits)
const jwtSecret = generateRandomString(32);

console.log(`Generated JWT Secret: ${jwtSecret}`);
