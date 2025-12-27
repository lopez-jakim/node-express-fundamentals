# AccrediTrack REST API

Complete REST API for managing accreditation tracking tasks with authentication, role-based access control, and file uploads.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run the Server
```bash
# Using npm script
npm run accreditrak

# Or with auto-reload during development
npm run dev

# Or directly with node
node accreditrak-server.js
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication

#### POST /api/auth/login
Login and receive a JWT token.

**Request:**
```json
{
  "userId": "COORD-001",
  "password": "coord123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": "COORD-001",
      "role": "coordinator",
      "name": "Coordinator User"
    }
  }
}
```

### Task Management

All task endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

#### GET /api/benchmark-tasks
List all tasks (with optional filters).

**Query Parameters:**
- `assigned_user_id` - Filter by assigned user
- `cycle_id` - Filter by accreditation cycle

**Note:** Faculty users can only see their own tasks.

**Example:**
```bash
curl -X GET "http://localhost:3000/api/benchmark-tasks?assigned_user_id=FACULTY-001" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### POST /api/benchmark-tasks
Create a new task. **Requires coordinator or admin role.**

**Request:**
```json
{
  "accreditationBenchmarkId": 103,
  "assignedUserId": "FACULTY-001",
  "cycleId": 2,
  "dueDate": "2025-06-30"
}
```

#### POST /api/benchmark-tasks/:taskId/submit
Submit a task with a PDF file. **Requires faculty role.**

**Request:** multipart/form-data
- Field name: `file`
- File type: PDF only
- Max size: 10MB

**Example:**
```bash
curl -X POST http://localhost:3000/api/benchmark-tasks/1/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@document.pdf"
```

**Note:** Faculty can only submit tasks assigned to them.

#### PATCH /api/benchmark-tasks/:taskId/review
Review a submitted task. **Requires coordinator or admin role.**

**Request:**
```json
{
  "status": "approved",
  "comment": "Excellent work! All requirements met."
}
```

**Status values:** `approved` or `for_revision`

## 👥 Mock Users

| User ID | Password | Role | Description |
|---------|----------|------|-------------|
| ADMIN-001 | admin123 | admin | Administrator |
| COORD-001 | coord123 | coordinator | Coordinator |
| FACULTY-001 | faculty123 | faculty | Faculty Member 1 |
| FACULTY-002 | faculty123 | faculty | Faculty Member 2 |

## 🔄 Task Workflow

1. **Pending** - Task is created and assigned to faculty
2. **Submitted** - Faculty uploads a PDF artifact
3. **Approved/For Revision** - Coordinator reviews and approves or requests revision

## 🔒 Security Features

- **JWT Authentication** - All protected routes require valid tokens
- **Role-Based Access Control** - Different permissions for admin, coordinator, and faculty
- **Task Ownership** - Faculty can only submit their own tasks
- **File Validation** - Only PDF files accepted, max 10MB
- **Secure File Naming** - Cryptographically secure random file names
- **Input Validation** - Comprehensive validation on all inputs

## 🧪 Testing

### Quick Test Script

```bash
# 1. Login as coordinator
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId": "COORD-001", "password": "coord123"}' | jq -r '.data.token')

# 2. Get all tasks
curl -s -X GET "http://localhost:3000/api/benchmark-tasks" \
  -H "Authorization: Bearer $TOKEN" | jq .

# 3. Create a new task
curl -s -X POST http://localhost:3000/api/benchmark-tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accreditationBenchmarkId": 103,
    "assignedUserId": "FACULTY-001",
    "cycleId": 2,
    "dueDate": "2025-06-30"
  }' | jq .

# 4. Login as faculty
TOKEN_FACULTY=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId": "FACULTY-001", "password": "faculty123"}' | jq -r '.data.token')

# 5. Submit a task (create a test PDF first)
curl -s -X POST http://localhost:3000/api/benchmark-tasks/3/submit \
  -H "Authorization: Bearer $TOKEN_FACULTY" \
  -F "file=@test-document.pdf" | jq .

# 6. Review the task (back to coordinator)
curl -s -X PATCH http://localhost:3000/api/benchmark-tasks/3/review \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved",
    "comment": "Well done!"
  }' | jq .
```

## 📁 Project Structure

```
node-express-fundamentals/
├── accreditrak-server.js        # Main server file
├── data/                         # In-memory data storage
│   ├── mockUsers.js             # Mock user authentication
│   ├── cycles.js                # Accreditation cycles
│   └── tasks.js                 # Task and artifact storage
├── middleware/                   # Express middleware
│   ├── auth.js                  # JWT authentication
│   └── upload.js                # File upload with multer
├── routes/                       # API route handlers
│   ├── authRoutes.js            # Login endpoint
│   └── taskRoutes.js            # Task CRUD + submission
└── uploads/                      # Uploaded files (gitignored)
    └── artifacts/               # PDF artifacts
```

## 🔐 Environment Variables

Set the JWT secret for production:

```bash
export JWT_SECRET="your-very-secure-random-secret-key-here"
npm run accreditrak
```

**Important:** Never use the default secret in production!

## 📝 Additional Documentation

- **API Details:** See comments in `accreditrak-server.js`
- **Security Notes:** See `SECURITY-NOTES.md`
- **Production Considerations:** See `SECURITY-NOTES.md`

## 🎓 Learning Objectives

This implementation demonstrates:
- REST API design patterns
- JWT authentication and token management
- Role-based access control (RBAC)
- Authorization and ownership validation
- File upload handling with Multer
- Express middleware architecture
- Error handling strategies
- Security best practices
- In-memory data storage patterns

## 📄 License

ISC

## 🙏 Credits

This is a learning project demonstrating REST API fundamentals with Express.js before implementing the TypeScript version in AccrediTrack-Backend.
