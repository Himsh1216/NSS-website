# NSS IIT Bhubaneswar Website

A modern, responsive website for the National Service Scheme (NSS) at IIT Bhubaneswar, built with React.js and Node.js.

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Event Management**: Display and manage NSS events and activities
- **Volunteer Registration**: Online form for new volunteer registration
- **Blog System**: Share event reports and updates
- **Responsive Design**: Works seamlessly on all devices
- **Contact Integration**: Email notifications via SendGrid

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **Bootstrap 5** - CSS framework for responsive design
- **Lucide React** - Modern icon library
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **SendGrid** - Email service integration
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NSS-website
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   PORT=5001
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
NSS-website/
├── public/                    # Static files, copied to build/ as-is
│   ├── icons/                 # Favicon and app icons generated from the NSS logo
│   ├── Team_photos/           # Current team photos; archive/<year>/ keeps past rosters (+ roster.json)
│   ├── Hero_section_home_photos/, Initiatives_photos/, events_photos/, past_events_photos/
│   ├── favicon.ico, og-image.png, manifest.json, robots.txt
│   └── index.html             # Head metadata: favicon links, Open Graph tags, JSON-LD
├── src/
│   ├── components/            # Navbar, Footer
│   ├── data/team.js           # People shown on the Team page
│   ├── pages/                 # HomePage, About, BlogPage, TeamPage
│   ├── App.js                 # Routes (Bootstrap 5 CSS/JS is imported once here)
│   └── index.js
├── backend/
│   ├── server.js              # Express server (registration email API)
│   ├── blogPosts.js           # Blog data, written by the Google Form integration
│   └── package.json
├── google-form-integration/   # Google Apps Script integration
└── package.json
```

## 🎨 Pages Overview

### Home Page
- Hero carousel with NSS images
- Animated statistics counter
- About section with call-to-action
- Recent events showcase
- Volunteer registration modal

### About Page
- Mission and vision statements
- Impact statistics with scroll animations
- Key initiatives showcase
- Call-to-action section

### Blog Page
- Event reports and updates
- Search and filter functionality
- Modal views for detailed content

### Team Page
- Faculty leadership (Dean of Student Affairs, NSS Programme Coordinator) and the team mentor
- Edit `src/data/team.js` to change names, roles or bios; each entry's `image` points into `public/Team_photos/`
- Drop a photo at that path and it appears automatically; until then a neutral placeholder is shown
- When a new team takes over, move the old photos to `public/Team_photos/archive/<academic-year>/` and record the roster in a `roster.json` there (see `archive/2024-25/`)

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `build`
3. Deploy automatically on push to main branch

### Backend
`vercel.json` builds `backend/server.js` with `@vercel/node` and routes `/api/*` to it, so the backend deploys with the frontend. `backend/node_modules` is not committed; Vercel installs it from `backend/package.json`.

### Search and link previews
The favicon set, `og-image.png`, `manifest.json` and the JSON-LD block in `public/index.html` were generated from `public/Navbar_photos/National-Service-Scheme-L.png`. The Open Graph and JSON-LD URLs are absolute, so update them if the site moves to a custom domain.

## 🧪 Development Best Practices

### Code Organization
- **Components**: Reusable UI components in `/src/components`
- **Pages**: Route-specific components in `/src/pages`
- **Styles**: Co-located CSS files with components
- **Assets**: Static files in `/public`

### State Management
- React hooks for local state
- Context API for global state (if needed)
- No external state management library required

### Styling
- Bootstrap 5 for responsive grid and utilities
- Custom CSS for specific component styling
- CSS-in-JS for dynamic styles
- Consistent naming conventions

### Performance
- Code splitting with React.lazy()
- Image optimization
- Intersection Observer for scroll animations
- Efficient re-rendering patterns

## 🔧 Available Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: nss@iitbbs.ac.in
- Create an issue in this repository

## 🙏 Acknowledgments

- IIT Bhubaneswar NSS Team
- All volunteer contributors
- Open source community

---

**Made with ❤️ by the NSS IIT Bhubaneswar team**