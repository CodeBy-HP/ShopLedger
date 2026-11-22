# ShopLedger

## Stack
- Node.js CommonJS app using Express 4 and body-parser.
- server.js serves the browser UI from public/ and mounts JSON API routers.
- lib/store.js reads and writes application data in data/db.json.

## Module map
### Routes
- routes/customers.js — lists customers and settlements; records Khata settlements.
- routes/orders.js — lists, looks up, places, and cancels orders.
- routes/products.js — lists products and active coupons.
- routes/reports.js — dashboard, GST reconciliation, pricing preview, and admin export.
### Library
- lib/coupons.js — normalizes and validates coupon codes, calculates discounts, lists active coupons.
- lib/dates.js — formats today, normalizes date keys, and derives fiscal years.
- lib/inventory.js — finds products, calculates sellable stock, checks availability, changes stock, summarizes inventory.
- lib/invoice.js — computes invoice figures and renders printable HTML.
- lib/ledger.js — lists customers, charges/reverses Khata orders, records settlements.
- lib/orders.js — adds, finds, cancels, and filters orders.
- lib/pricing.js — computes subtotals, discounts, and GST order totals.
- lib/reports.js — builds dashboard and GST reconciliation summaries.
- lib/store.js — reads/writes JSON data and appends audit entries.
- lib/tax.js — resolves GST rates and splits CGST/SGST.

## Commands
- Start the app: npm start
- Run tests: node --test

## Rules
1. Write characterization tests before changing behaviour.
2. Change only the module(s) the ticket is about.
3. Tests never read or write data/db.json; use in-memory data.
4. Add no dependencies.
5. Make the smallest fix that works.

## Current ticket
Cannot sell the last sellable unit in stock, and cancelling an order never restores stock.
Allowed files: lib/inventory.js and lib/orders.js (cancel only).
