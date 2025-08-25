# Gemini Project Context

This document provides context about the `hng-legacy-next` project for the Gemini AI assistant.

## Project Overview

This is a Next.js application built with TypeScript and styled with Tailwind CSS and DaisyUI. The project appears to be a web application for displaying and querying glyphs or characters, based on the data files found in `src/data` and the component names in `src/components`. The data seems to be sourced from CSV and TSV files.

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI**: React 19
- **Styling**: Tailwind CSS 4 with the DaisyUI component library
- **Package Manager**: pnpm

## Key Commands

- **Run development server**: `pnpm dev`
- **Create production build**: `pnpm build`
- **Start production server**: `pnpm start`
- **Run linter**: `pnpm lint`

## Project Structure

- **Pages**: The main application pages are located in `src/app`.
- **Components**: Reusable React components are in `src/components`.
- **Static Assets**: Public assets like images are in the `public` directory.
- **Data**: Raw data files (CSV/TSV) are stored in `src/data`.
- **Utilities**: Helper functions and constants are in `src/lib`.
- **Types**: TypeScript type definitions are in `src/types`.
