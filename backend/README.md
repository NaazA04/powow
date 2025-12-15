# PetMatch Backend API

Simple and straightforward Express backend for the PetMatch pet adoption portal.

## 🚀 Features

- ✅ Simple Express REST API
- ✅ MongoDB with Mongoose
- ✅ JWT Authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Pet CRUD operations
- ✅ Adoption application system
- ✅ Demo data seeding

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
PORT=5001
MONGODB_URI=mongodb://localhost:27017/petmatch
JWT_SECRET=your-secret-key-here
```

3. Seed the database with demo data:
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
```

The API will run on http://localhost:5001

## 📚 API Endpoints

### Authentication

**POST** `/api/auth/register`
- Register a new user
- Body: `{ name, email, password, phone, role }`

**POST** `/api/auth/login`
- Login user
- Body: `{ email, password }`
- Returns: JWT token

### Pets (Public)

**GET** `/api/pets`
- Get all pets
- Query params: `species`, `gender`, `age`

**GET** `/api/pets/:id`
- Get single pet by ID

### Pets (Admin Only)

**POST** `/api/pets`
- Create new pet
- Requires: Admin authentication

**PUT** `/api/pets/:id`
- Update pet
- Requires: Admin authentication

**DELETE** `/api/pets/:id`
- Delete pet
- Requires: Admin authentication

### Adoptions

**POST** `/api/adoptions`
- Submit adoption application
- Requires: User authentication

**GET** `/api/adoptions/user`
- Get user's applications
- Requires: User authentication

**GET** `/api/adoptions/admin`
- Get all applications
- Requires: Admin authentication

**PUT** `/api/adoptions/:id`
- Update application status
- Requires: Admin authentication

## 🗄️ Database Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- phone (String)
- role (String: 'adopter' | 'admin')

### Pet
- name (String)
- species (String: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other')
- breed (String)
- age (Number)
- gender (String: 'male' | 'female')
- description (String)
- images (Array of Strings)
- status (String: 'available' | 'pending' | 'adopted')
- characteristics (Array of Strings)

### AdoptionRequest
- user (ObjectId -> User)
- pet (ObjectId -> Pet)
- fullName, email, phone, address (String)
- experience (String)
- reason (String)
- status (String: 'pending' | 'approved' | 'rejected')
- adminNotes (String)

## 🔑 Demo Accounts

After running `npm run seed`:

**User Account:**
- Email: user@demo.com
- Password: password

**Admin Account:**
- Email: admin@demo.com
- Password: password

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Seed database with demo data

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Login or register to get a token
2. Include token in requests: `Authorization: Bearer <token>`
3. Protected routes verify the token

## 🌐 CORS

CORS is enabled for all origins in development. For production, update the CORS configuration in `server.js`.

## 📦 Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - CORS middleware
- dotenv - Environment variables

## 🚀 Deployment

For production deployment:

1. Use MongoDB Atlas for database
2. Update `.env` with production values
3. Set `NODE_ENV=production`
4. Use a process manager like PM2

Example for Heroku, Railway, or Render:
- Set environment variables in platform dashboard
- The app will automatically use `PORT` from environment

---

Built with simplicity in mind! 🐾
