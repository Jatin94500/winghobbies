# Contributing Guide

## Welcome Contributors!

Thank you for your interest in contributing to Wing Hobbies! This guide will help you get started.

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Unprofessional conduct

## Getting Started

### 1. Fork the Repository

```bash
# Fork on GitHub, then clone
git clone https://github.com/your-username/Wing-hobbies.git
cd Wing-hobbies
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### 3. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

## Development Workflow

### Branch Naming Convention

- **Features**: `feature/add-payment-gateway`
- **Bug Fixes**: `fix/cart-quantity-bug`
- **Documentation**: `docs/update-readme`
- **Refactoring**: `refactor/optimize-context`
- **Tests**: `test/add-cart-tests`

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:

```bash
git commit -m "feat(cart): add voucher code validation"
git commit -m "fix(navbar): resolve mobile menu toggle issue"
git commit -m "docs(readme): update installation instructions"
```

### Code Style

#### JavaScript/React

```javascript
// Use functional components
const ProductCard = ({ product }) => {
  // Component logic
};

// Use hooks
const [state, setState] = useState(initialValue);
const { user } = useAuth();

// Destructure props
const { name, price, image } = product;

// Use arrow functions
const handleClick = () => {
  // logic
};

// Add PropTypes (optional)
ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
```

#### CSS

```css
/* Use Bootstrap classes first */
<div className="d-flex justify-content-between align-items-center">

/* Custom classes for specific styling */
.product-card {
  transition: transform 0.3s ease;
}

/* Use BEM naming for custom classes */
.product-card__image { }
.product-card__title { }
```

#### File Naming

- Components: `PascalCase.js` (e.g., `ProductCard.js`)
- Utilities: `camelCase.js` (e.g., `formatCurrency.js`)
- Styles: `kebab-case.css` (e.g., `product-card.css`)

### Code Quality

#### ESLint

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

#### Prettier

```bash
# Format code
npm run format
```

#### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Making Changes

### 1. Write Clean Code

- Follow existing code style
- Keep functions small and focused
- Use meaningful variable names
- Add comments for complex logic
- Remove console.logs before committing

### 2. Test Your Changes

- Test on multiple browsers
- Test responsive design
- Test all user flows
- Check console for errors
- Verify no broken links

### 3. Update Documentation

- Update README if needed
- Add JSDoc comments
- Update CHANGELOG
- Add inline comments for complex code

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with message
git commit -m "feat(products): add price range filter"

# Push to your fork
git push origin feature/your-feature-name
```

## Pull Request Process

### 1. Create Pull Request

- Go to GitHub repository
- Click "New Pull Request"
- Select your branch
- Fill in PR template

### 2. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] All tests pass

## Screenshots
Add screenshots if applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### 3. Code Review

- Address reviewer feedback
- Make requested changes
- Push updates to same branch
- Request re-review

### 4. Merge

Once approved:
- Squash commits if needed
- Merge to main branch
- Delete feature branch

## Contribution Areas

### Features to Add

#### High Priority
- Payment gateway integration (Razorpay/Stripe)
- Email notifications
- SMS alerts
- Order tracking
- Product reviews submission
- User profile image upload

#### Medium Priority
- Advanced search filters
- Product recommendations
- Wishlist sharing
- Gift wrapping option
- Multiple addresses
- Order cancellation

#### Low Priority
- Dark mode toggle
- Multi-language support
- Currency conversion
- AR product preview
- Voice search
- Chatbot integration

### Bug Fixes

Check GitHub Issues for:
- Mobile responsiveness issues
- Browser compatibility
- Performance bottlenecks
- Accessibility improvements
- Security vulnerabilities

### Documentation

- API documentation
- Component documentation
- Tutorial videos
- Code examples
- FAQ updates
- Translation

### Testing

- Unit tests for components
- Integration tests
- E2E tests
- Performance tests
- Accessibility tests

## Development Guidelines

### Component Structure

```javascript
// Imports
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Component.css';

// Component
const Component = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);
  const { user } = useAuth();
  
  // Effects
  useEffect(() => {
    // effect logic
  }, [dependency]);
  
  // Handlers
  const handleClick = () => {
    // logic
  };
  
  // Render
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};

// PropTypes
Component.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

// Default props
Component.defaultProps = {
  prop2: 0
};

// Export
export default Component;
```

### Context Pattern

```javascript
// Create context
const MyContext = createContext();

// Provider component
export const MyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  const value = {
    state,
    setState,
    // methods
  };
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

### API Integration

```javascript
// API service
const api = {
  baseURL: process.env.REACT_APP_API_URL,
  
  async get(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Usage
const products = await api.get('/products');
```

## Testing Guidelines

### Unit Tests

```javascript
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

test('renders product name', () => {
  const product = { id: 1, name: 'Test Product' };
  render(<ProductCard product={product} />);
  expect(screen.getByText('Test Product')).toBeInTheDocument();
});
```

### Integration Tests

```javascript
test('adds product to cart', () => {
  render(
    <CartProvider>
      <ProductPage />
    </CartProvider>
  );
  
  const addButton = screen.getByText('Add to Cart');
  fireEvent.click(addButton);
  
  expect(screen.getByText('1 item in cart')).toBeInTheDocument();
});
```

## Performance Best Practices

### 1. Optimize Re-renders

```javascript
// Use React.memo
const ProductCard = React.memo(({ product }) => {
  // component
});

// Use useMemo
const total = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.price, 0);
}, [cart]);

// Use useCallback
const handleClick = useCallback(() => {
  // logic
}, [dependency]);
```

### 2. Code Splitting

```javascript
// Lazy load components
const ProductPage = lazy(() => import('./pages/ProductPage'));

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <ProductPage />
</Suspense>
```

### 3. Image Optimization

```javascript
// Lazy load images
<img loading="lazy" src={image} alt={name} />

// Use WebP format
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt={name} />
</picture>
```

## Accessibility Guidelines

### 1. Semantic HTML

```html
<nav>Navigation</nav>
<main>Main content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>
```

### 2. ARIA Labels

```html
<button aria-label="Add to cart">
  <i className="fas fa-cart-plus"></i>
</button>
```

### 3. Keyboard Navigation

```javascript
const handleKeyPress = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
};
```

### 4. Color Contrast

Ensure minimum contrast ratio of 4.5:1 for text.

## Security Guidelines

### 1. Input Validation

```javascript
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 2. XSS Prevention

```javascript
// Don't use dangerouslySetInnerHTML
// Sanitize user input
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirty);
```

### 3. Authentication

```javascript
// Store tokens securely
// Use httpOnly cookies
// Implement CSRF protection
```

## Questions?

- Create a GitHub Discussion
- Email: dev@Winghobbies.com
- Join our Discord community

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Invited to contributor meetings

Thank you for contributing to Wing Hobbies! 🚀
