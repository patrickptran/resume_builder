# Resume Builder V2

This repository contains a **Next.js 13** application for creating, editing,
and previewing a resume. The project is written in **TypeScript**, uses
**React Hook Form** with **Zod** schemas for client-side validation, and
showcases a modular component design driven by the `app/` route
architecture and Tailwind CSS.

[Watch Demo 🚀](https://my-vibe-coder.vercel.app/)

## Features

- Dynamic form dialogs for personal info, education, work experience,
skills, and projects.
- Auto‑save to local storage with a convenient header indicator.
- Drag‑and‑drop section ordering and live preview.
- Schema validation using Zod; data models defined in
  `app/schemas/resume.ts`.
- UI built with custom Shadcn components (`components/ui/*`).

## Getting Started

### Requirements

- Node.js 18+ (tested with 20)

### Development

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Changes
auto-reload thanks to Next.js and Turbopack.

### Building for Production

```bash
npm run build     # compile and type-check
npm run start     # run the production server
```

Or deploy to Vercel/other hosting platforms using the standard Next.js
workflow.

### Type Checking & Linting

```bash
npm run lint
npm run type-check
```

## 📁 Project Structure

```
app/                # Next.js 13 app directory
  components/        # page-specific components & dialogs
    forms/           # form dialogs for each resume section
    preview/         # resume preview component
  schemas/           # Zod schemas + exported types
components/         # shared UI primitives (Form, Button, etc.)
context/            # React context (autosave, template order, etc.)
hooks/              # custom hooks (useToast, useAutoSave, ...)
lib/                # utilities and type defs
public/             # static assets
```