# Styling Guide

## Overview

Wing Hobbies uses Bootstrap 5.3.0 as the primary CSS framework with custom styles for branding and animations.

## Theme Colors

### Primary Colors

```css
/* Dark Background */
--dark: #212529;
--dark-rgb: 33, 37, 41;

/* Yellow Accent */
--warning: #ffc107;
--warning-rgb: 255, 193, 7;

/* Light Background */
--light: #f8f9fa;
--light-rgb: 248, 249, 250;
```

### Semantic Colors

```css
/* Success */
--success: #198754;

/* Danger */
--danger: #dc3545;

/* Info */
--info: #0dcaf0;

/* Secondary */
--secondary: #6c757d;
```

## Typography

### Fonts

```css
/* Primary Font */
font-family: 'Inter', sans-serif;

/* Secondary Font */
font-family: 'Roboto', sans-serif;
```

### Font Sizes

```css
/* Headings */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

/* Body */
body { font-size: 1rem; }

/* Small */
small { font-size: 0.875rem; }
```

### Font Weights

```css
.fw-light { font-weight: 300; }
.fw-normal { font-weight: 400; }
.fw-semibold { font-weight: 600; }
.fw-bold { font-weight: 700; }
```

## Bootstrap Classes

### Layout

```html
<!-- Container -->
<div class="container">...</div>
<div class="container-fluid">...</div>

<!-- Grid -->
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">...</div>
</div>

<!-- Flexbox -->
<div class="d-flex justify-content-between align-items-center">...</div>
```

### Spacing

```html
<!-- Margin -->
<div class="m-0">No margin</div>
<div class="mt-3">Top margin</div>
<div class="mb-4">Bottom margin</div>
<div class="mx-auto">Horizontal center</div>

<!-- Padding -->
<div class="p-0">No padding</div>
<div class="pt-3">Top padding</div>
<div class="pb-4">Bottom padding</div>
<div class="px-5">Horizontal padding</div>
```

### Colors

```html
<!-- Text Colors -->
<p class="text-dark">Dark text</p>
<p class="text-warning">Yellow text</p>
<p class="text-muted">Muted text</p>

<!-- Background Colors -->
<div class="bg-dark">Dark background</div>
<div class="bg-warning">Yellow background</div>
<div class="bg-light">Light background</div>
```

### Buttons

```html
<!-- Primary Button -->
<button class="btn btn-warning">Primary</button>

<!-- Outline Button -->
<button class="btn btn-outline-warning">Outline</button>

<!-- Sizes -->
<button class="btn btn-warning btn-sm">Small</button>
<button class="btn btn-warning">Default</button>
<button class="btn btn-warning btn-lg">Large</button>

<!-- Block Button -->
<button class="btn btn-warning w-100">Full Width</button>
```

### Cards

```html
<div class="card border-0 shadow-sm">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Title</h5>
    <p class="card-text">Content</p>
    <a href="#" class="btn btn-warning">Action</a>
  </div>
</div>
```

## Custom Styles

### Animations

**Location**: `src/index.css`

#### Fade In Up

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

#### Pulse

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s infinite;
}
```

#### Bounce

```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce {
  animation: bounce 1s infinite;
}
```

#### Loading Spinner

```css
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  animation: loading 1s linear infinite;
}
```

### Skeleton Loading

```css
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #e0e0e0 40px,
    #f0f0f0 80px
  );
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s infinite;
}
```

### Product Card Hover

```css
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
}
```

### Navbar Styles

```css
.navbar {
  z-index: 1030;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand img {
  height: 35px;
}

.navbar .btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
```

### Sidebar Styles

```css
.sidebar {
  position: sticky;
  top: 80px;
  z-index: 1;
}

@media (max-width: 991.98px) {
  .sidebar {
    position: static;
  }
}
```

### Toast Styles

```css
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.toast {
  min-width: 300px;
  animation: fadeInUp 0.3s ease-out;
}
```

## Responsive Design

### Breakpoints

```css
/* Extra Small (xs) */
@media (max-width: 575.98px) { }

/* Small (sm) */
@media (min-width: 576px) and (max-width: 767.98px) { }

/* Medium (md) */
@media (min-width: 768px) and (max-width: 991.98px) { }

/* Large (lg) */
@media (min-width: 992px) and (max-width: 1199.98px) { }

/* Extra Large (xl) */
@media (min-width: 1200px) { }
```

### Mobile Styles

```css
/* Mobile Navbar */
@media (max-width: 991.98px) {
  .navbar-collapse {
    background: #212529;
    padding: 1rem;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
  }
}

/* Mobile Cards */
@media (max-width: 767.98px) {
  .card {
    margin-bottom: 1rem;
  }
  
  .card-img-top {
    height: 150px !important;
  }
}

/* Mobile Typography */
@media (max-width: 575.98px) {
  h1 { font-size: 1.75rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
}

/* Touch Targets */
@media (max-width: 767.98px) {
  .btn {
    min-height: 44px;
    min-width: 44px;
  }
}
```

### Responsive Utilities

```html
<!-- Display -->
<div class="d-none d-md-block">Hidden on mobile</div>
<div class="d-block d-md-none">Visible on mobile only</div>

<!-- Spacing -->
<div class="mt-3 mt-md-5">Responsive margin</div>
<div class="px-2 px-md-4">Responsive padding</div>

<!-- Grid -->
<div class="col-12 col-md-6 col-lg-4">Responsive columns</div>
```

## Component Styling Patterns

### Card Pattern

```html
<div class="card border-0 shadow-sm h-100">
  <div class="card-body">
    <h5 class="card-title fw-bold">Title</h5>
    <p class="card-text text-muted">Description</p>
    <button class="btn btn-warning fw-bold">Action</button>
  </div>
</div>
```

### Header Pattern

```html
<div class="bg-dark text-white p-3 mb-4">
  <h2 class="mb-0">
    <span class="text-warning">Wing</span> Hobbies
  </h2>
</div>
```

### Badge Pattern

```html
<span class="badge bg-warning text-dark">New</span>
<span class="badge bg-danger">Sale</span>
<span class="badge bg-success">In Stock</span>
```

### Input Group Pattern

```html
<div class="input-group">
  <span class="input-group-text bg-dark text-warning border-0">
    <i class="fas fa-search"></i>
  </span>
  <input type="text" class="form-control" placeholder="Search...">
</div>
```

## Icon Usage

### Font Awesome

```html
<!-- Solid Icons -->
<i class="fas fa-shopping-cart"></i>
<i class="fas fa-heart"></i>
<i class="fas fa-user"></i>

<!-- Regular Icons -->
<i class="far fa-heart"></i>
<i class="far fa-star"></i>

<!-- Brands -->
<i class="fab fa-facebook"></i>
<i class="fab fa-twitter"></i>

<!-- Sizes -->
<i class="fas fa-home fa-xs"></i>
<i class="fas fa-home fa-sm"></i>
<i class="fas fa-home fa-lg"></i>
<i class="fas fa-home fa-2x"></i>
<i class="fas fa-home fa-3x"></i>
```

## Utility Classes

### Display

```css
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-inline { display: inline; }
.d-inline-block { display: inline-block; }
```

### Position

```css
.position-relative { position: relative; }
.position-absolute { position: absolute; }
.position-fixed { position: fixed; }
.position-sticky { position: sticky; }
```

### Overflow

```css
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-scroll { overflow: scroll; }
```

### Z-Index

```css
.z-1 { z-index: 1; }
.z-2 { z-index: 2; }
.z-3 { z-index: 3; }
```

## Best Practices

### 1. Use Bootstrap First

Prefer Bootstrap classes over custom CSS:

```html
<!-- ✅ Good -->
<div class="mt-3 mb-4 text-center">

<!-- ❌ Bad -->
<div style="margin-top: 1rem; margin-bottom: 1.5rem; text-align: center;">
```

### 2. Consistent Spacing

Use Bootstrap spacing scale (0-5):

```html
<div class="p-3">Padding 1rem</div>
<div class="m-4">Margin 1.5rem</div>
<div class="gap-2">Gap 0.5rem</div>
```

### 3. Semantic Colors

Use semantic color classes:

```html
<button class="btn btn-success">Save</button>
<button class="btn btn-danger">Delete</button>
<button class="btn btn-warning">Edit</button>
```

### 4. Responsive Design

Always consider mobile-first:

```html
<div class="col-12 col-md-6 col-lg-4">
  <!-- Mobile: full width -->
  <!-- Tablet: half width -->
  <!-- Desktop: third width -->
</div>
```

### 5. Accessibility

Ensure sufficient contrast and touch targets:

```css
/* Minimum contrast ratio: 4.5:1 */
color: #212529; /* Dark text */
background: #ffffff; /* White background */

/* Minimum touch target: 44x44px */
.btn {
  min-height: 44px;
  min-width: 44px;
}
```

### 6. Performance

Minimize custom CSS and use Bootstrap utilities:

```html
<!-- ✅ Good (uses Bootstrap) -->
<div class="d-flex justify-content-between align-items-center">

<!-- ❌ Bad (custom CSS needed) -->
<div class="custom-flex-container">
```

## Customization

### Override Bootstrap Variables

Create `custom.scss`:

```scss
// Override Bootstrap variables
$primary: #ffc107;
$dark: #212529;
$font-family-base: 'Inter', sans-serif;

// Import Bootstrap
@import '~bootstrap/scss/bootstrap';
```

### Custom Theme

```css
:root {
  --Wing-primary: #ffc107;
  --Wing-dark: #212529;
  --Wing-light: #f8f9fa;
}

.btn-Wing {
  background: var(--Wing-primary);
  color: var(--Wing-dark);
}
```
