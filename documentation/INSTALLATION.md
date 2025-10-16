# Installation Guide

## Prerequisites

Before installing Wing Hobbies, ensure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Git** (for cloning repository)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd rc-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- react (^18.x)
- react-dom (^18.x)
- react-router-dom (^6.x)
- bootstrap (^5.3.0)
- @fortawesome/fontawesome-free (^7.1.0)

### 3. Environment Setup

Create a `.env` file in the root directory (optional):

```env
REACT_APP_NAME=Wing Hobbies
REACT_APP_VERSION=1.0.0
```

### 4. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Project Structure

```
rc-ecommerce/
├── public/
│   ├── index.html          # HTML template
│   ├── robots.txt          # SEO crawler rules
│   └── favicon.ico         # Site icon
├── src/
│   ├── user/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Context providers
│   │   ├── data/           # Mock data
│   │   └── pages/          # Page components
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── documentation/          # Project documentation
├── package.json            # Dependencies
└── README.md               # Project readme
```

## Verification

After installation, verify the setup:

1. **Home Page** - Should display featured products
2. **Navigation** - All menu items should work
3. **Search** - Search functionality should filter products
4. **Cart** - Add items to cart
5. **Authentication** - Login/register forms should work
6. **Responsive** - Test on mobile viewport

## Common Installation Issues

### Port Already in Use

If port 3000 is occupied:

```bash
# Windows
set PORT=3001 && npm start

# Linux/Mac
PORT=3001 npm start
```

### Module Not Found

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Bootstrap Not Loading

Ensure Bootstrap is imported in `src/index.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

### Font Awesome Icons Missing

Verify Font Awesome import in `src/index.js`:

```javascript
import '@fortawesome/fontawesome-free/css/all.min.css';
```

## Development Tools

### Recommended VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Path Intellisense

### Browser DevTools

- React Developer Tools (Chrome/Firefox extension)
- Redux DevTools (if using Redux)

## Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (irreversible)
npm run eject
```

## Docker Setup (Optional)

### Build Docker Image

```bash
docker build -t Wing-hobbies .
```

### Run Container

```bash
docker run -p 3000:3000 Wing-hobbies
```

### Docker Compose

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
```

## Next Steps

After successful installation:

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the codebase
2. Review [COMPONENTS.md](COMPONENTS.md) for component documentation
3. Check [CONTEXT_API.md](CONTEXT_API.md) for state management
4. Explore [STYLING.md](STYLING.md) for customization

## Support

For installation issues:
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Contact: support@Winghobbies.com
- Phone: +91 7985079854
