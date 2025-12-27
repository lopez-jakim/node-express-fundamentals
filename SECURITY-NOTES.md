# Security Notes

## Known Issues (Learning Project)

### 1. Multer Version
This project uses `multer@1.4.5-lts.1` as specified in the requirements. This version has known vulnerabilities that are patched in Multer 2.x. 

**For Production**: Upgrade to `multer@^2.0.0` or later.

### 2. JWT Secret Key
The JWT secret key has been moved to use environment variables (`process.env.JWT_SECRET`) with a fallback to a default value for learning purposes.

**For Production**: 
- ALWAYS use environment variables for secrets
- NEVER commit secrets to source control
- Use a strong, randomly generated secret (at least 256 bits)

Example:
```bash
export JWT_SECRET="your-very-long-and-random-secret-key-here"
node accreditrak-server.js
```

### 3. Password Storage
This implementation uses plain text passwords in mock data for learning purposes.

**For Production**:
- NEVER store passwords in plain text
- Use bcrypt or argon2 for password hashing
- Implement proper user authentication with a database

### 4. HTTPS
This server runs on HTTP for local development.

**For Production**:
- ALWAYS use HTTPS
- Implement TLS/SSL certificates
- Use a reverse proxy like nginx or a cloud service

### 5. Input Validation
While basic validation is implemented, more comprehensive validation should be added.

**For Production**:
- Use validation libraries like Joi or express-validator
- Sanitize all user inputs
- Implement rate limiting
- Add CORS configuration

## Security Improvements Made

✅ Role-based access control (RBAC)
✅ Task authorization (faculty can only submit their own tasks)
✅ User validation when creating tasks
✅ File type and size validation
✅ JWT token expiration
✅ Environment variable support for JWT secret
