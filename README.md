# Google Keep — React

A pixel-faithful React rewrite of your Google Keep clone, split into clean, composable components.

## Project Structure

```
src/
├── index.js          # React entry point
├── index.css         # Global styles, CSS variables (light + dark mode)
├── App.js            # Root component — all state lives here
│
├── Navbar.js         # Top navigation bar
├── Navbar.css
│
├── Sidebar.js        # Collapsible left sidebar
├── Sidebar.css
│
├── Form.js           # Note creation form (collapsed ↔ expanded)
├── Form.css
│
├── Notes.js          # Note grid with drag-and-drop, section labels
├── Notes.css
│
├── Note.js           # Individual note card (pin, archive, delete, drag)
├── Note.css
│
├── Modal.js          # Edit-note modal overlay
└── Modal.css

public/
└── index.html        # HTML shell (loads Material Symbols font)
```

## Features

| Feature | Where |
|---|---|
| Add notes (title + text) | `Form.js` |
| Delete notes | `Note.js` → `App.js` |
| Pin / unpin notes | `Note.js`, `Modal.js` → `App.js` |
| Archive notes | `Note.js` → `App.js` |
| Edit notes in modal | `Modal.js` → `App.js` |
| Drag-and-drop reorder | `Notes.js` → `App.js` |
| Dark / light mode toggle | `Navbar.js` → `App.js` |
| Search / filter notes | `Navbar.js` → `App.js` |
| Pinned notes section | `Notes.js` |
| Persists to localStorage | `App.js` |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start

# Production build
npm run build
```

## How State Flows

```
App.js  (notes[], darkMode, openNote, searchQuery)
  ├── Navbar      ← receives darkMode, onToggleDark, searchQuery, onSearch
  ├── Sidebar     (stateless — no props needed)
  ├── Form        ← onAddNote
  ├── Notes       ← notes[], onDelete, onPin, onArchive, onOpenNote, onReorder
  │     └── Note  ← individual note + drag handlers
  └── Modal       ← openNote, onClose (saves edits back to App)
```
