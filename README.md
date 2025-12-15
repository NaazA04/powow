# PetMatch - Pet Adoption Portal

![PetMatch](https://img.shields.io/badge/React-18.x-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-cyan) ![Vite](https://img.shields.io/badge/Vite-5.x-purple)

A production-quality MERN stack pet adoption portal connecting animal shelters with potential adopters through a modern, animated, and user-friendly interface.

## 🚀 Features

### Frontend (✅ Complete)
- 🎨 Modern UI with glassmorphism and animations
- 🐾 Pet browsing with advanced filters
- 💖 Favorite pets functionality
- 📝 Adoption application system
- 👤 User profiles and dashboards
- 🔐 JWT authentication
- 🔊 Optional sound feedback
- 📱 Fully responsive design

### Backend (Coming Soon)
- Node.js + Express REST API
- MongoDB with Mongoose
- Role-based access control
- Pet CRUD operations
- Application management

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Hooks
- Vite for blazing-fast development
- Tailwind CSS v3 for styling
- Framer Motion for animations
- React Router for navigation
- Axios for HTTP requests
- React Hot Toast for notifications

**Backend (Planned):**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt for password hashing

## 📦 Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will run on http://localhost:3000

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 User Roles

1. **Adopter (User)**
   - Browse and search pets
   - Apply for adoption
   - Track application status
   - Manage favorites

2. **Admin (Shelter)**
   - Add/edit/delete pets
   - Review applications
   - Approve/reject requests
   - View statistics

## 📁 Project Structure

```
PawWow/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth & Sound contexts
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app with routing
│   │   └── index.css      # Global styles
│   ├── public/
│   └── package.json
└── backend/               # Coming soon
```

## 🎨 Design Highlights

- **Color Palette**: Warm, pet-friendly colors (orange, peach, cream)
- **Animations**: Smooth page transitions, hover effects, floating elements
- **Glassmorphism**: Backdrop blur effects on cards and navigation
- **Typography**: Google Fonts Inter
- **Icons**: Heroicons
- **Responsive**: Mobile-first design

## 🔐 Demo Credentials

**User Account:**
- Email: user@demo.com
- Password: password

**Admin Account:**
- Email: admin@demo.com
- Password: password

## 📸 Screenshots

### Landing Page
Modern hero section with animated elements and feature highlights

### Pet Listing
Browse pets with advanced filters (species, age, gender)

### Pet Details
Detailed pet information with image carousel and adoption application

### Admin Dashboard
Manage pets and review adoption applications

## 🎵 Sound Feedback

The app includes optional sound effects:
- Button click sounds
- Success notifications
- Error alerts

Toggle sounds on/off using the speaker icon in the navbar.

## 🚧 Development Status

**Phase 1: Frontend** ✅ Complete
- UI components
- Pages and routing
- Animations
- Sound system
- Mock data integration

**Phase 2: Backend** 🔄 In Progress
- Express server setup
- MongoDB integration
- API endpoints
- Authentication

**Phase 3: Integration** 📅 Planned
- Connect frontend to backend
- End-to-end testing
- Production deployment

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own use!

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes.

## 🙏 Acknowledgments

- Pet icons and emojis for visual appeal
- Tailwind CSS for rapid styling
- Framer Motion for smooth animations
- React community for excellent tools

---

Built with ❤️ for pets looking for their forever homes 🐾
