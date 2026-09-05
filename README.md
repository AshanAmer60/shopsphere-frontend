# ShopSphere

Frontend for an e-commerce store: a public catalog for customers and a protected admin dashboard for inventory.

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Talks to a REST backend over cookie-based auth.

## Features

- Storefront: product grid, live search, sale pricing
- Auth: sign up, sign in, session restore, logout (`customer` / `admin`)
- Route protection: Next.js middleware gates `/dashboard` on an `accessToken` cookie
- Admin: create and manage products and categories (images, stock, discounts)

## Stack

| | |
|---|---|
| Framework | Next.js (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Axios + cookie credentials |
| Tests | Vitest, React Testing Library |

## Setup

```bash
npm install
```

Create a `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api/v1
BACKEND_URL=http://localhost:4000
```

Then:

```bash
npm run dev          # http://localhost:3000
npm run test:run     # product listing + search tests
```

The API is expected at `http://localhost:4000` (rewritten via `/api/v1`).
