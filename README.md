# 🐾 PawWow - Pet Adoption Platform

![React](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

A modern, full-stack MERN (MongoDB, Express, React, Node.js) pet adoption platform that connects animal shelters with potential adopters through an intuitive and beautiful interface. PawWow makes it easy for users to find their perfect companion and for administrators to manage pets, applications, and veterinary resources.

## ✨ Features

### 🎯 For Adopters
- **Pet Discovery**: Browse available pets with advanced filtering by species, breed, age, gender, size, and energy level
- **Smart Matching Quiz**: Take a personalized quiz to find pets that match your lifestyle and preferences
- **Favorites System**: Save favorite pets and track them easily
- **Adoption Applications**: Submit and track adoption applications with real-time status updates
- **Pet Details**: View comprehensive pet profiles with image carousels, characteristics, and detailed descriptions
- **Vet Directory**: Access a directory of verified veterinarians with contact information and specializations
- **User Dashboard**: Manage your profile, view application history, and track favorites

### 👨‍💼 For Administrators
- **Pet Management**: Full CRUD operations for managing pet listings
- **Application Review**: Review, approve, or reject adoption applications
- **Analytics Dashboard**: View statistics on pet species distribution, application status, and availability
- **Vet Management**: Add, edit, verify, and manage veterinarian profiles
- **Match Quiz Insights**: View quiz results and analyze popular pet preferences
- **User Management**: Monitor user activity and manage accounts

### 🎨 User Experience
- Modern UI with glassmorphism effects and smooth animations
- Fully responsive design (mobile, tablet, desktop)
- Interactive sound feedback (toggle on/off)
- Toast notifications for user actions
- Secure JWT-based authentication
- Protected routes with role-based access control

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library with hooks
- **Vite 5.x** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router 6.20** - Client-side routing
- **Framer Motion 10.16** - Smooth animations and transitions
- **Axios 1.6** - HTTP client for API requests
- **React Hot Toast 2.4** - Toast notifications
- **Recharts 3.5** - Charts for analytics dashboard
- **Heroicons 2.1** - Beautiful SVG icons
- **jwt-decode 4.0** - JWT token decoding

### Backend
- **Node.js** with **Express 4.18** - RESTful API server
- **MongoDB** with **Mongoose 8.0** - NoSQL database and ODM
- **bcryptjs 2.4** - Password hashing
- **jsonwebtoken 9.0** - JWT authentication
- **CORS 2.8** - Cross-origin resource sharing
- **dotenv 16.3** - Environment variable management

## 📁 Project Structure

```
powow/
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx     # Navigation bar with auth state
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   ├── pets/          # Pet-related components
│   │   │   │   ├── PetCard.jsx
│   │   │   │   └── PetFilter.jsx
│   │   │   ├── quiz/          # Quiz components
│   │   │   │   └── MatchQuiz.jsx
│   │   │   ├── vets/          # Vet components
│   │   │   │   └── VetProfileModal.jsx
│   │   │   └── ui/            # Generic UI components
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── Modal.jsx
│   │   │       └── ImageCarousel.jsx
│   │   ├── context/           # React context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── SoundContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── PetListingPage.jsx
│   │   │   ├── PetDetailPage.jsx
│   │   │   ├── FavoritesPage.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   ├── QuizResultsPage.jsx
│   │   │   ├── VetDirectoryPage.jsx
│   │   │   ├── auth/          # Authentication pages
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   ├── user/          # User pages
│   │   │   │   └── UserProfile.jsx
│   │   │   └── admin/         # Admin pages
│   │   │       └── AdminDashboard.jsx
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx           # App entry point
│   │   └── index.css          # Global styles and Tailwind
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── package.json           # Dependencies and scripts
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind configuration
│
└── backend/                   # Express backend API
    ├── models/                # Mongoose schemas
    │   ├── User.js            # User model with auth
    │   ├── Pet.js             # Pet model with attributes
    │   ├── AdoptionRequest.js # Adoption application model
    │   ├── QuizResult.js      # Quiz results model
    │   └── Vet.js             # Veterinarian model
    ├── routes/                # API route handlers
    │   ├── auth.js            # Authentication endpoints
    │   ├── pets.js            # Pet CRUD operations
    │   ├── adoptions.js       # Adoption management
    │   ├── quiz.js            # Quiz and matching logic
    │   └── vets.js            # Vet directory endpoints
    ├── middleware/            # Custom middleware
    │   └── auth.js            # JWT authentication middleware
    ├── server.js              # Express server setup
    ├── seed.js                # Database seeding script
    ├── verify_vets.js         # Vet verification utility
    ├── package.json           # Dependencies and scripts
    ├── .env.example           # Environment variables template
    └── README.md              # Backend documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/powow.git
   cd powow
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update with your values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/petmatch
   JWT_SECRET=your-secret-key-change-this-in-production
   ```

4. **Seed the Database** (Optional - creates demo data)
   ```bash
   npm run seed
   ```

5. **Start the Backend Server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

6. **Set up the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

7. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

## 🎮 Usage

### Demo Accounts

After seeding the database, you can use these demo accounts:

**Regular User:**
- Email: `user@demo.com`
- Password: `password`

**Administrator:**
- Email: `admin@demo.com`
- Password: `password`

### Key User Flows

#### For Adopters:
1. Browse pets on the listing page with filters
2. Click on a pet to view detailed information
3. Take the matching quiz to find your perfect pet
4. Add pets to favorites for later
5. Submit an adoption application
6. Track application status in your profile
7. Find veterinarians in the vet directory

#### For Admins:
1. Log in with admin credentials
2. Access the admin dashboard
3. Add, edit, or remove pet listings
4. Review and process adoption applications
5. Manage veterinarian profiles
6. View analytics and insights
7. Monitor quiz results and preferences

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info (protected)

### Pets
- `GET /api/pets` - Get all pets (with filters)
- `GET /api/pets/:id` - Get single pet
- `POST /api/pets` - Create pet (admin only)
- `PUT /api/pets/:id` - Update pet (admin only)
- `DELETE /api/pets/:id` - Delete pet (admin only)

### Adoptions
- `GET /api/adoptions` - Get all applications (admin) or user's applications
- `POST /api/adoptions` - Submit adoption application (authenticated)
- `PUT /api/adoptions/:id` - Update application status (admin only)

### Quiz
- `POST /api/quiz` - Submit quiz and get matches
- `GET /api/quiz/results` - Get all quiz results (admin only)

### Vets
- `GET /api/vets` - Get all vets
- `POST /api/vets` - Add vet (admin only)
- `PUT /api/vets/:id` - Update vet (admin only)
- `DELETE /api/vets/:id` - Delete vet (admin only)

## 🎨 Design System

### Color Palette
- **Primary**: Brown tones (`#8d6e63`, `#a1887f`) - Warm, earthy pet-friendly colors
- **Accent**: Orange (`#f97316`) - Energy and enthusiasm
- **Neutral**: Cream and beige backgrounds - Soft, welcoming feel
- **Text**: Dark gray for readability

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, larger sizes
- **Body**: Regular weight, readable sizes

### UI Patterns
- **Glassmorphism**: Backdrop blur effects on cards
- **Smooth Animations**: Framer Motion for page transitions
- **Hover Effects**: Interactive feedback on buttons and cards
- **Responsive Grid**: Mobile-first approach with Tailwind breakpoints

## 🧪 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with hot reload
npm run seed     # Seed database with demo data
```

## 🔐 Authentication & Security

- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Protected Routes**: Middleware for route authorization
- **Role-Based Access**: Separate permissions for users and admins
- **CORS**: Configured for cross-origin requests

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px and above



**Built with ❤️ and 🐾 to help pets find loving homes**
