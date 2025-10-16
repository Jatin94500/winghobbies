# Files to Delete Manually

## Duplicate Files (Delete these - we use pages/ versions):
1. `src/user/components/Cart.js` - DELETE (use CartPage.js instead)
2. `src/user/components/Checkout.js` - DELETE (use CheckoutPage.js instead)
3. `src/user/App.js` - DELETE (use root src/App.js instead)

## Unused CSS Files (Delete these):
4. `src/App.css` - DELETE (using index.css and Bootstrap)
5. `src/user/styles/animations.css` - DELETE (not needed)
6. `src/user/styles/loading.css` - DELETE (not needed)

## Keep These Files:
✅ `src/App.js` - Main app with all routes
✅ `src/index.js` - Entry point
✅ `src/index.css` - Main CSS
✅ `src/user/pages/CartPage.js` - Cart page (Wing theme)
✅ `src/user/pages/CheckoutPage.js` - Checkout page (Wing theme)
✅ `src/user/pages/Home.js` - Home page
✅ `src/user/components/Navbar.js` - Navigation
✅ `src/user/components/Footer.js` - Footer
✅ `src/user/context/CartContext.js` - Cart state management
✅ `src/user/data/products.js` - Product data
✅ `src/user/styles/globals.css` - Keep for Tailwind

## How to Delete (Windows):
Open Command Prompt in project folder and run:
```
del src\user\components\Cart.js
del src\user\components\Checkout.js
del src\user\App.js
del src\App.css
del src\user\styles\animations.css
del src\user\styles\loading.css
```

Or delete manually through File Explorer.
