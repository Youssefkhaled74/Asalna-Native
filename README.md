# Asalna Premium Store

Vanilla ecommerce experience for the Egyptian honey brand Asalna.

## Stack
- HTML
- CSS
- Vanilla JavaScript
- Plain Node.js HTTP server
- SQLite

## Structure
- `public/` frontend pages, styles, scripts, assets
- `server/` Node server and SQLite helpers
- `database/` schema, seed data, SQLite file

## Run locally
1. Install dependencies:
   `npm install`
2. Start the server:
   `npm start`
3. Open:
   `http://localhost:3000`

## Admin login
- Username: `admin`
- Password: `asalnaadmin`

## Main features
- Cinematic premium home page
- Product listing with search, category filter, price filter, sorting
- Product details with zoom, sticky buy panel, related products
- Persistent cart in localStorage
- Checkout that writes real orders to SQLite
- Orders page backed by SQLite order history
- Admin login with session cookie
- Admin stats, order management, product CRUD

## Coupon
- Use `ASALNA10` in cart UI for a 10% discount view.

## Notes
- Orders, order items, products, categories, and admin user are stored in SQLite.
- On first run, the server initializes schema and seed data automatically.
