# Project Overview: Sklep AGD (Household Goods Shop)

This project is a modern e-commerce prototype for a household goods shop, built with **Next.js 16** and **React 19**. It features a sophisticated, minimalist design focused on high-quality visuals and smooth user experience.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (using `@tailwindcss/postcss`)
- **Icons:** Lucide React
- **UI Components:** Radix UI via shadcn/ui
- **Fonts:** Geist, Geist Mono, Cormorant Garamond
- **Notifications:** Sonner

## Core Architecture
- `app/`: Contains the application routes and layouts.
  - `shop/`: Main shop page with category filtering and wishlist logic.
  - `collections/`: Collections overview page.
- `components/`: Modular UI components.
  - `ui/`: Base shadcn/ui components.
  - `shadcn-space/`: Specialized layout blocks (e.g., Navbar).
- `data/`: Static data files for products and collections.
- `lib/`: Utility functions (e.g., `cn` for Tailwind class merging).
- `public/`: Static assets like product images and backgrounds.

## Building and Running
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Start Production:** `npm run start`
- **Linting:** `npm run lint`

## Development Conventions
- **Component Styling:** Prefer utility-first CSS with Tailwind CSS 4. Use the `cn` utility from `@/lib/utils` for conditional class merging.
- **Data Handling:** Products and collections are currently managed as static arrays in `data/products.tsx` and `data/collections.tsx`.
- **Localization:** The project is primarily in Polish (`lang="pl"`).
- **Images:** Uses `next/image` for optimization. Remote images from Unsplash are allowed in `next.config.ts`.
- **UI System:** Adheres to shadcn/ui patterns. New components should be added to `components/ui` following existing conventions.

## ⚠️ Special Note
This project uses **Next.js 16**, which may have breaking changes compared to previous versions. Refer to `node_modules/next/dist/docs/` for specific API details if you encounter unexpected behavior.
