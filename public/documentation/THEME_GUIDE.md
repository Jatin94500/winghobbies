# Wing Hobbies - Theme Documentation

## 🎨 Brand Identity

### Brand Name
**Wing Hobbies** - Premium RC Models & Accessories

### Tagline
"Discover the world of RC flying with professional grade models"

---

## 🎯 Color Palette

### Primary Colors
- **Dark Background**: `bg-dark` (#212529)
- **Warning/Accent**: `text-warning` / `btn-warning` (#ffc107 - Yellow/Gold)
- **Light Background**: `bg-light` (#f8f9fa)

### Secondary Colors
- **White Text**: `text-white` (#ffffff)
- **Dark Text**: `text-dark` (#212529)
- **Muted Text**: `text-muted` (#6c757d)

### Usage Guidelines
```jsx
// Primary Button
<button className="btn btn-warning fw-bold">Shop Now</button>

// Secondary Button
<button className="btn btn-dark fw-bold">Learn More</button>

// Outline Button
<button className="btn btn-outline-warning">View All</button>

// Text Accent
<span className="text-warning">Wing</span> Hobbies

// Background Sections
<section className="bg-dark text-white">...</section>
<section className="bg-light">...</section>
<section className="bg-warning">...</section>
```

---

## 🏗️ Layout Structure

### Navbar
```jsx
- Dark navbar (navbar-dark bg-dark)
- Logo: Wing Hobbies with yellow "Wing" text
- Search bar with yellow button
- Cart with badge counter
- Dropdown categories
- Sticky top positioning
```

### Home Page Sections (In Order)
1. **Banner** - Hero image with overlay
2. **Featured Products** - 8 products grid
3. **Special Offers** - 3 offer cards with images
4. **Shop by Category** - 8 categories with images
5. **Big Discount Offers** - Full-width promo section
6. **Why Choose Us** - 3 feature cards
7. **Footer** - Comprehensive footer with 5 columns

---

## 📦 Component Styling

### Cards
```jsx
// Product Card
<div className="card h-100 border-0 shadow-sm">
  <img className="card-img-top" style={{height: '200px', objectFit: 'cover'}} />
  <div className="card-body">
    <h6 className="card-title text-dark">Product Name</h6>
    <span className="badge bg-warning text-dark">4.5 ★</span>
    <span className="fw-bold text-warning fs-5">₹12,499</span>
  </div>
  <div className="card-footer bg-transparent border-0">
    <button className="btn btn-warning w-100 fw-bold">Add to Cart</button>
  </div>
</div>

// Category Card
<div className="card h-100 border-0 shadow-sm">
  <img className="card-img-top" style={{height: '150px', objectFit: 'cover'}} />
  <div className="card-body text-center">
    <h6 className="card-title text-dark fw-bold">Category Name</h6>
    <p className="text-warning fw-semibold">120+ Models</p>
  </div>
</div>

// Offer Card
<div className="card bg-dark border-warning">
  <img className="card-img-top" style={{height: '200px', objectFit: 'cover'}} />
  <div className="card-img-overlay d-flex flex-column justify-content-end">
    <div className="bg-dark bg-opacity-75 p-3 rounded border border-warning">
      <h4 className="text-warning fw-bold">50% OFF</h4>
      <button className="btn btn-warning btn-sm fw-bold">Shop Now</button>
    </div>
  </div>
</div>
```

### Typography
```jsx
// Headings
<h1 className="display-4 fw-bold">Main Heading</h1>
<h2 className="fw-bold">Section Title</h2>
<h6 className="fw-bold">Card Title</h6>

// Body Text
<p className="lead">Important text</p>
<p className="text-muted">Secondary text</p>

// Accent Text
<span className="text-warning">Highlighted</span>
```

### Buttons
```jsx
// Primary Action
<button className="btn btn-warning btn-lg fw-bold">Shop Now</button>

// Secondary Action
<button className="btn btn-dark btn-lg fw-bold">Learn More</button>

// Outline
<button className="btn btn-outline-warning">View All</button>

// Small Button
<button className="btn btn-warning btn-sm fw-bold">Shop Now</button>

// Full Width
<button className="btn btn-warning w-100 fw-bold">Add to Cart</button>
```

---

## 🎭 Section Templates

### Hero Banner
```jsx
<section className="position-relative">
  <img src="banner.jpg" className="w-100" style={{height: '400px', objectFit: 'cover'}} />
  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center">
    <div className="container text-white">
      <h1 className="display-4 fw-bold">
        <span className="text-warning">Wing</span> Hobbies
      </h1>
      <p className="lead">Tagline here</p>
      <button className="btn btn-warning btn-lg fw-bold">Shop Now</button>
    </div>
  </div>
</section>
```

### Product Grid Section
```jsx
<section className="py-5 bg-light">
  <div className="container">
    <div className="d-flex justify-content-between align-items-center mb-5">
      <h2 className="fw-bold text-dark">Section Title</h2>
      <Link to="/products" className="btn btn-outline-warning">View All</Link>
    </div>
    <div className="row g-4">
      {/* Product cards here */}
    </div>
  </div>
</section>
```

### Dark Section with Yellow Accent
```jsx
<section className="py-5 bg-dark text-white">
  <div className="container">
    <h2 className="text-center fw-bold mb-5">
      <span className="text-warning">Highlighted</span> Title
    </h2>
    {/* Content here */}
  </div>
</section>
```

### Yellow Background Section
```jsx
<section className="py-5 bg-warning">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <img src="image.jpg" className="img-fluid rounded shadow" />
      </div>
      <div className="col-md-6 text-dark">
        <h2 className="display-4 fw-bold">Title</h2>
        <button className="btn btn-dark btn-lg fw-bold">CTA</button>
      </div>
    </div>
  </div>
</section>
```

---

## 🔤 Font & Icons

### Font Family
- Primary: Bootstrap default (system fonts)
- Weight: `fw-bold`, `fw-semibold`, `fw-normal`

### Icons
- Font Awesome 6 (Free)
- Common icons:
  - Shopping: `fa-shopping-cart`, `fa-heart`
  - Social: `fa-facebook`, `fa-instagram`, `fa-youtube`, `fa-twitter`
  - Features: `fa-shipping-fast`, `fa-undo`, `fa-headset`, `fa-award`, `fa-users`, `fa-rocket`
  - Contact: `fa-phone`, `fa-envelope`

---

## 📱 Responsive Breakpoints

```jsx
// Bootstrap Grid
col-xl-3  // Extra large (≥1200px) - 4 columns
col-lg-4  // Large (≥992px) - 3 columns
col-md-6  // Medium (≥768px) - 2 columns
col-sm-6  // Small (≥576px) - 2 columns
col-12    // Extra small (<576px) - 1 column
```

---

## 🎬 Animations (Framer Motion)

### Basic Animation
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Hover Effects
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive Element
</motion.div>
```

---

## 📋 Footer Structure

### Columns (5 sections)
1. **Verified & Trusted** - Payment logos
2. **Follow Us** - Social media links
3. **Policies** - Legal pages
4. **Top Categories** - Quick links
5. **Customer Help** - Support & contact

### Copyright Bar
```jsx
<hr className="my-4" />
<div className="row align-items-center">
  <div className="col-md-6">
    <p className="mb-0 text-muted">
      © 2025 <span className="text-warning fw-bold">Wing Hobbies</span>. All rights reserved.
    </p>
  </div>
  <div className="col-md-6 text-md-end">
    <p className="mb-0 text-muted">Made with ❤️ for RC enthusiasts</p>
  </div>
</div>
```

---

## 🛠️ Quick Reference

### Must-Use Classes
- `fw-bold` - Bold text
- `shadow-sm` - Subtle shadow
- `rounded` - Rounded corners
- `text-decoration-none` - Remove underline from links
- `py-5` - Vertical padding (section spacing)
- `mb-5` - Bottom margin
- `g-4` - Grid gap

### Color Combinations
- Dark section: `bg-dark text-white` with `text-warning` accents
- Light section: `bg-light` with `text-dark` and `text-warning` accents
- Yellow section: `bg-warning` with `text-dark`

### Image Styling
```jsx
style={{height: '200px', objectFit: 'cover'}}
className="img-fluid rounded shadow"
```

---

## 📝 Notes

- Always use `text-warning` for brand accent color
- Maintain dark/light contrast for readability
- Use `fw-bold` for important text
- Keep consistent spacing with `py-5` for sections
- Use Bootstrap grid system for responsive layouts
- Add `shadow-sm` to cards for depth
- Use Font Awesome icons consistently

---

## 🚀 Quick Start Template

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NewPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">
            <span className="text-warning">Wing</span> Hobbies
          </h1>
          <p className="lead">Your tagline here</p>
          <button className="btn btn-warning btn-lg fw-bold">Get Started</button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-dark mb-5">Section Title</h2>
          <div className="row g-4">
            {/* Your content here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewPage;
```

---

**Last Updated**: 2025
**Version**: 1.0
**Maintained by**: Wing Hobbies Development Team
