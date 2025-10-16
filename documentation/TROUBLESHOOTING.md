# Troubleshooting Guide

## Installation Issues

### npm install fails

**Problem**: Dependencies fail to install

**Solutions**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try with legacy peer deps
npm install --legacy-peer-deps
```

---

### Port 3000 already in use

**Problem**: Another process is using port 3000

**Solutions**:

**Windows**:
```bash
# Find process
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F

# Or use different port
set PORT=3001 && npm start
```

**Linux/Mac**:
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

---

### Module not found errors

**Problem**: Cannot find module 'react' or other packages

**Solutions**:

```bash
# Verify package.json
cat package.json

# Reinstall specific package
npm install react react-dom

# Reinstall all packages
rm -rf node_modules
npm install
```

---

## Build Issues

### Build fails with memory error

**Problem**: JavaScript heap out of memory

**Solutions**:

```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Windows
set NODE_OPTIONS=--max-old-space-size=4096 && npm run build
```

---

### Build succeeds but app doesn't work

**Problem**: Production build has errors

**Solutions**:

1. Check browser console for errors
2. Verify environment variables
3. Test build locally:

```bash
npm run build
npx serve -s build
```

4. Check for hardcoded localhost URLs
5. Verify API endpoints

---

## Runtime Issues

### Blank page after deployment

**Problem**: App shows blank page in production

**Solutions**:

1. **Check browser console** for errors

2. **Verify homepage in package.json**:
```json
{
  "homepage": "https://yourdomain.com"
}
```

3. **Check routing configuration**:
```javascript
// Use HashRouter for static hosting
import { HashRouter } from 'react-router-dom';
```

4. **Verify server configuration** for SPA:
```nginx
# Nginx
location / {
    try_files $uri /index.html;
}
```

---

### Images not loading

**Problem**: Product images show broken

**Solutions**:

1. **Check image URLs** in products.js
2. **Verify CORS** if using external images
3. **Use relative paths** for local images:
```javascript
image: "/images/product.jpg"
```

4. **Check image format** (jpg, png, webp)

---

### Cart not persisting

**Problem**: Cart items disappear on refresh

**Solutions**:

1. **Check localStorage** in browser DevTools
2. **Verify CartContext** is wrapping App
3. **Check localStorage key**:
```javascript
localStorage.getItem('Winghobbies_cart')
```

4. **Clear localStorage** and test:
```javascript
localStorage.clear()
```

---

### Login not working

**Problem**: Cannot login or register

**Solutions**:

1. **Check AuthContext** implementation
2. **Verify form validation**
3. **Check localStorage**:
```javascript
localStorage.getItem('Winghobbies_user')
```

4. **Test with demo credentials**:
```javascript
email: "demo@Winghobbies.com"
password: "demo123"
```

---

## Styling Issues

### Bootstrap styles not loading

**Problem**: App looks unstyled

**Solutions**:

1. **Verify Bootstrap import** in index.js:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

2. **Check import order** (Bootstrap before custom CSS)

3. **Clear browser cache**

4. **Check CDN** in index.html:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

---

### Font Awesome icons not shoWing

**Problem**: Icons appear as squares

**Solutions**:

1. **Verify Font Awesome import**:
```javascript
import '@fortawesome/fontawesome-free/css/all.min.css';
```

2. **Check CDN** in index.html:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

3. **Use correct icon classes**:
```html
<i class="fas fa-shopping-cart"></i>
```

---

### Mobile layout broken

**Problem**: App not responsive on mobile

**Solutions**:

1. **Add viewport meta tag**:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

2. **Use Bootstrap responsive classes**:
```html
<div class="col-12 col-md-6 col-lg-4">
```

3. **Test with browser DevTools** mobile view

4. **Check custom CSS** for fixed widths

---

## Performance Issues

### Slow page load

**Problem**: App takes long to load

**Solutions**:

1. **Optimize images**:
```bash
# Use WebP format
# Compress images
# Use lazy loading
```

2. **Code splitting**:
```javascript
const ProductPage = lazy(() => import('./pages/ProductPage'));
```

3. **Remove unused dependencies**:
```bash
npm install -g depcheck
depcheck
```

4. **Enable production build**:
```bash
npm run build
```

---

### High memory usage

**Problem**: Browser tab uses too much memory

**Solutions**:

1. **Check for memory leaks**:
```javascript
// Clean up useEffect
useEffect(() => {
  return () => {
    // cleanup
  };
}, []);
```

2. **Optimize re-renders**:
```javascript
const MemoizedComponent = React.memo(Component);
```

3. **Use React DevTools Profiler**

---

## Context Issues

### Context value is undefined

**Problem**: useAuth() returns undefined

**Solutions**:

1. **Verify Provider wraps component**:
```javascript
<AuthProvider>
  <App />
</AuthProvider>
```

2. **Check Provider order**:
```javascript
// Correct order
<AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>
```

3. **Import correct hook**:
```javascript
import { useAuth } from '../context/AuthContext';
```

---

### State not updating

**Problem**: Context state doesn't update

**Solutions**:

1. **Check state setter**:
```javascript
setUser({ ...user, name: 'New Name' });
```

2. **Verify dependencies**:
```javascript
useEffect(() => {
  // effect
}, [dependency]);
```

3. **Use functional updates**:
```javascript
setCart(prevCart => [...prevCart, newItem]);
```

---

## Routing Issues

### 404 on page refresh

**Problem**: Direct URL access shows 404

**Solutions**:

1. **Configure server** for SPA:

**Nginx**:
```nginx
location / {
    try_files $uri /index.html;
}
```

**Apache**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Vercel** (vercel.json):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

2. **Use HashRouter** as fallback:
```javascript
import { HashRouter } from 'react-router-dom';
```

---

### Links not working

**Problem**: Navigation doesn't work

**Solutions**:

1. **Use Link component**:
```javascript
import { Link } from 'react-router-dom';
<Link to="/products">Products</Link>
```

2. **Don't use <a> tags** for internal links

3. **Check route paths**:
```javascript
<Route path="/products" element={<Products />} />
```

---

## Browser Compatibility

### App not working in older browsers

**Problem**: Features don't work in IE11 or old browsers

**Solutions**:

1. **Add polyfills**:
```bash
npm install react-app-polyfill
```

```javascript
// index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
```

2. **Check browser support**:
```json
// package.json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
```

3. **Use transpiled code**

---

## Development Issues

### Hot reload not working

**Problem**: Changes don't reflect automatically

**Solutions**:

1. **Restart dev server**:
```bash
npm start
```

2. **Check file watcher limits** (Linux):
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

3. **Disable browser cache** in DevTools

---

### ESLint errors

**Problem**: Linting errors prevent build

**Solutions**:

1. **Fix errors**:
```bash
npm run lint
```

2. **Disable ESLint** temporarily:
```javascript
// .env
DISABLE_ESLINT_PLUGIN=true
```

3. **Ignore specific rules**:
```javascript
/* eslint-disable react-hooks/exhaustive-deps */
```

---

## Database/API Issues

### localStorage quota exceeded

**Problem**: Cannot save more data

**Solutions**:

1. **Clear old data**:
```javascript
localStorage.clear();
```

2. **Implement data cleanup**:
```javascript
// Keep only last 10 items
const recentlyViewed = items.slice(-10);
```

3. **Use IndexedDB** for larger data

---

### CORS errors

**Problem**: API requests blocked by CORS

**Solutions**:

1. **Configure backend** CORS headers:
```javascript
// Express
app.use(cors({
  origin: 'https://Winghobbies.com'
}));
```

2. **Use proxy** in development:
```json
// package.json
"proxy": "http://localhost:5000"
```

3. **Check API endpoint** URLs

---

## Common Error Messages

### "Cannot read property of undefined"

**Solutions**:
- Add optional chaining: `user?.name`
- Add null checks: `if (user) { ... }`
- Provide default values: `const name = user?.name || 'Guest'`

---

### "Maximum update depth exceeded"

**Solutions**:
- Check useEffect dependencies
- Avoid setState in render
- Use useCallback for functions

---

### "Objects are not valid as React child"

**Solutions**:
- Don't render objects directly
- Use JSON.stringify for debugging
- Render object properties: `{user.name}`

---

## Getting Help

### Debug Tools

1. **React DevTools** - Component inspection
2. **Redux DevTools** - State debugging
3. **Browser Console** - Error messages
4. **Network Tab** - API requests
5. **Lighthouse** - Performance audit

### Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Audit security
npm audit

# Clear cache
npm cache clean --force
```

### Resources

- [React Documentation](https://react.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [Stack Overflow](https://stackoverflow.com)
- [GitHub Issues](https://github.com)

### Contact Support

If issues persist:
- Email: support@Winghobbies.com
- Phone: +91 7985079854, +91 9889816016
- Create GitHub issue with:
  - Error message
  - Steps to reproduce
  - Browser/OS information
  - Screenshots
