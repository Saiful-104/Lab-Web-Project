# ScholarHub - Frontend

A modern React-based web application for discovering and applying to scholarships worldwide. Built with a focus on user experience, responsive design, and comprehensive scholarship management.

**Live Demo:** https://scholarships-store.netlify.app/

## 📋 Quick Links

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Demo Credentials](#demo-credentials)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)

## 🚀 Features

### Core Features

- **User Authentication**: Secure login and registration with Firebase + Google Sign-in
- **Scholarship Discovery**: Search and filter scholarships by 50+ criteria
- **Advanced Search**: Category, subject, country, price range filtering
- **Pagination & Sorting**: Efficient data display with multiple sorting options
- **Application Management**: Track applications with real-time status updates
- **Review & Rating System**: Community-driven scholarship reviews
- **Profile Management**: Update profile, change password, manage preferences
- **Wishlist**: Save scholarships for later review
- **Payment Integration**: Secure Stripe payment gateway
- **Dashboard Analytics**: Real-time platform statistics for admins
- **Dark Mode Support**: Full dark/light theme support
- **Responsive Design**: Mobile-first, fully responsive layout

## 🛠️ Tech Stack

**Frontend:**

- React 19 - UI library
- React Router 7 - Routing
- React Query (TanStack) - Server state management
- TailwindCSS 4 - Utility-first CSS
- DaisyUI - Component library

**Backend Integration:**

- Axios - HTTP client with interceptors
- Firebase - Authentication
- Stripe - Payment processing

**Additional Libraries:**

- Framer Motion - Animations
- React Hook Form - Form management
- Recharts - Charts and graphs
- Lucide React & React Icons - Icon libraries
- React Hot Toast - Notifications

**Developer Tools:**

- Vite - Build tool
- ESLint - Code quality

## 🚀 Getting Started

### Prerequisites

- Node.js v16+ and npm/yarn
- Firebase project setup
- Stripe account (for payments)
- IMGBB account (for image uploads)

### Installation

1. **Clone and install:**

   ```bash
   cd frontend
   npm install
   ```

2. **Create `.env.local`:**

   ```env
   VITE_API_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_IMGBB_API_KEY=your_imgbb_key
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

### Demo Accounts

**Student:**

- Email: student@demo.com
- Password: Demo@12345

**Admin:**

- Email: admin@demo.com
- Password: Demo@12345

Use the **"Demo Login"** button in navigation for quick access.

### Security Features

- Firebase JWT authentication
- Secure axios interceptors
- Protected routes by role
- Encrypted sensitive data
- CORS validation

## 📱 Responsive Design

- **Mobile**: 320px+ (full functionality)
- **Tablet**: 768px+ (optimized layout)
- **Desktop**: 1024px+ (full features)

No horizontal overflow, all components adapt seamlessly.

## 🌙 Dark Mode

Fully supported with:

- System preference detection
- Manual toggle in navigation
- Persistent storage
- WCAG contrast compliance

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── layouts/            # Layout wrappers
├── hooks/              # Custom hooks
├── providers/          # Context providers
├── routes/             # Route definitions
├── utils/              # Utility functions
├── firebase/           # Firebase config
└── main.jsx            # Entry point
```

## 🔗 API Endpoints

All endpoints available at `VITE_API_URL`:

| Endpoint                  | Method | Auth | Purpose                 |
| ------------------------- | ------ | ---- | ----------------------- |
| `/scholarships`           | GET    | No   | Get all scholarships    |
| `/scholarships/:id`       | GET    | No   | Get single scholarship  |
| `/top/scholarships`       | GET    | No   | Get top 6 scholarships  |
| `/my-applications/:email` | GET    | Yes  | Get user's applications |
| `/apply-scholarship`      | POST   | Yes  | Apply for scholarship   |
| `/reviews/:id`            | GET    | No   | Get reviews             |
| `/wishlist/:email`        | GET    | Yes  | Get user's wishlist     |
| `/contact`                | POST   | No   | Submit contact form     |

## 🚀 Deployment

### To Netlify

1. Build: `npm run build`
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

The `_redirects` file handles SPA routing automatically.

## 📚 Documentation

- See [API Documentation](../backend/README.md) for backend endpoints
- See [Backend Setup](../backend/README.md) for server configuration

## 💡 Key Features Explained

### Advanced Search & Filtering

- Full-text search on scholarship names and universities
- Multi-criteria filtering (category, subject, country, degree)
- Dynamic sorting options
- Result pagination with configurable page size

### Application Management

- Real-time status tracking
- Edit pending applications
- Cancel applications when needed
- Application history

### Review System

- Vote on review helpfulness
- Rate from 1-5 stars
- Community feedback
- Moderated reviews

### Dashboard Analytics (Admin)

- Total users count
- Scholarships statistics
- Revenue metrics
- Application charts
- Category distribution

## 🐛 Troubleshooting

### Images not loading

- Verify IMGBB API key
- Check file size (max 5MB)
- Ensure internet connection

### Auth issues

- Clear localStorage
- Check Firebase config
- Ensure correct credentials

### Build errors

- `npm install` fresh
- Clear cache: `rm -rf node_modules`
- Check Node version: `node --version`

## 📄 License

Educational project for assignment purposes.

## 👥 Support

- Website: ScholarHub - Empowering Futures
- Email: support@scholarhub.com
- Help: `/help` page
- Contact: `/contact` page

## 📋 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Dashboard/      # Dashboard-related components
│   │   └── Sidebar/    # Navigation sidebar with role-based menus
│   ├── Form/           # Form components for scholarship management
│   ├── Home/           # Home page components
│   ├── Modal/          # Modal dialogs
│   ├── Shared/         # Shared/common components
│   │   ├── Button/
│   │   ├── Footer/
│   │   └── Navbar/
│   └── Payment/        # Payment-related components
├── firebase/           # Firebase configuration
├── hooks/              # Custom React hooks
│   ├── useAuth         # Authentication context hook
│   ├── useAxiosSecure  # Secured axios instance
│   ├── useRole         # User role detection
│   └── useWishlist     # Wishlist management
├── layouts/            # Page layouts
├── pages/              # Page components
│   ├── Dashboard/      # Dashboard pages by role
│   ├── Home/           # Home page
│   ├── Login/          # Login page
│   ├── ScholarshipDetails/
│   └── SignUp/         # Registration page
├── providers/          # Context providers
├── routes/             # Route definitions
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure Firebase**:
   - Update `src/firebase/firebase.config.js` with your Firebase credentials

3. **Start development server**:

   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview production build locally

## 🔐 User Roles

### Student

- Browse and search scholarships
- Apply for scholarships
- Track application status
- Submit and manage reviews
- Manage wishlist
- View profile and settings

### Moderator

- Review scholarship applications
- Approve/reject applications
- Manage feedback
- Generate reports

### Admin

- Full system access
- Manage all scholarships
- Manage user roles
- View analytics and statistics
- System configuration

## 🔌 API Integration

The frontend connects to a backend API for:

- Authentication
- Scholarship data management
- Application processing
- Review management
- User management

Configure the API base URL in the axios interceptor or environment variables.

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: UI components library built on Tailwind
- **Custom CSS**: `src/index.css` for global styles

## 🔒 Security

- Firebase authentication for secure login
- Axios interceptors for secured API calls
- Protected routes based on user roles
- Secure payment processing with Stripe

## 📦 Dependencies Overview

| Package         | Purpose                   |
| --------------- | ------------------------- |
| react           | Core framework            |
| react-router    | Client-side routing       |
| axios           | HTTP client               |
| firebase        | Authentication & database |
| react-query     | Server state management   |
| react-hook-form | Form management           |
| tailwindcss     | Utility-first CSS         |
| stripe          | Payment processing        |
| framer-motion   | Animations                |
| recharts        | Charts & graphs           |

## 🐛 Troubleshooting

### Port already in use

If port 5173 is in use, Vite will automatically try the next available port.

### Firebase connection issues

- Verify Firebase configuration in `firebase/firebase.config.js`
- Check internet connection
- Ensure Firebase project is active

### Build errors

- Clear `node_modules` and reinstall: `npm install`
- Clear Vite cache: Delete `.vite` folder
- Rebuild: `npm run build`

## 📞 Support

For issues or questions, please refer to the main project documentation or contact the development team.

## 📄 License

This project is part of an academic assignment.
