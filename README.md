# Zod Todo App

A simple and elegant todo application built with Next.js and Zod for robust data validation. Manage your tasks with confidence knowing that all data is properly validated and type-safe.

## Features

- ✅ **Create, Read, Update, Delete** todos with full CRUD functionality
- 🛡️ **Zod Validation** - All input data is validated using Zod schemas for type safety
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Real-time Updates** - Instant feedback for all todo operations
- 📱 **Mobile Friendly** - Responsive design that works on all devices
- 🔍 **Error Handling** - Comprehensive error handling with user-friendly messages

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Zod** - Schema validation and type inference
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How Zod Validation Works

The app uses Zod schemas to ensure data integrity:

- **Todo Schema**: Validates todo structure with id, title, description, completion status, and timestamps
- **Input Validation**: All user inputs are validated before processing
- **Type Safety**: TypeScript types are automatically inferred from Zod schemas
- **Error Messages**: Clear validation error messages guide users to correct input

Check out `src/lib/schemas.ts` to see the validation rules in action.

## Project Structure

```
src/
├── app/                 # Next.js app router pages and API routes
├── components/          # Reusable React components
└── lib/                # Zod schemas and utilities
```

## Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
