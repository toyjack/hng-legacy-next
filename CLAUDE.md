# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the production application
- `npm run lint` - Run ESLint for code quality checks
- `npm start` - Start production server

## Project Architecture

### Core Purpose
HNG Legacy Next is a Japanese character (kanji) search application that displays detailed glyph information from various historical sources. The app allows users to search for characters and view their representations across different historical documents and calligraphy styles.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with DaisyUI components
- **Data Processing**: csv-parse for handling TSV/CSV data files
- **Japanese Language**: Primary language is Japanese (lang="ja")

### Key Architecture Patterns

#### Data Layer (`src/lib/data.ts`)
- All data functions use React's `cache()` for performance optimization
- Two main data sources:
  - `src/data/all_table_v.5.0_2019-01-15.csv` - Character entry data with glyph references
  - `src/data/books.tsv` - Book/source metadata
- Key interfaces:
  - `Entry2` - Character entries with glyph data
  - `Glyph` - Individual glyph representations from different sources
  - `Book` - Metadata for historical sources
  - `Results` - Search result wrapper

#### Data Processing Pattern
The app transforms flat CSV data into structured objects:
1. `getAllEntries()` reads CSV data and converts entries to include nested `glyphs` arrays
2. Each glyph represents a character's appearance in different historical sources
3. Sources are identified by book IDs (e.g., "khi", "khm", "hok") with corresponding shape/sample counts

#### Route Structure
- `/` - Home page with font samples and UI components demo
- `/query/[entryChar]` - Dynamic route for character search results
- `/api/entries` - API endpoint returning all entries as JSON
- `/(old)/search/*` - Legacy search routes (deprecated)

#### Component Organization
- `CardContainer` - Reusable container for grouped content
- `GlyphCard` - Displays individual glyph images with metadata
- `ResultTabContainer` - Tabbed navigation component
- `Header/Footer` - Layout components

### Data File Structure
- Character images stored in `/public/images/[book_id]/[glyph_id].png`
- Book types categorized using `BookTypeList` from constants
- Character lookup by first character using `searchEntries(query)`

### Critical Implementation Notes
- The app processes extensive character data (200+ fields per entry for different historical sources)
- Glyph filtering by book type enables categorized display
- All book-related data lookups are cached for performance
- TODO comment in QueryEntryPage indicates planned refactor to static generation