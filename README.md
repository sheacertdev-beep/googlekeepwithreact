#  Google Keep Using React 

A clone of [Google Keep](https://keep.google.com) built with **React**. It Has the core features you'd expect i.e. notes, pinning, drag-and-drop reordering, dark mode.

---

## Features

| Feature | Description |
|---|---|
|  **Create Notes** | Collapsed input expands into a full title + text form |
|  **Pin Notes** | Pin any note to keep it at the top; pinned notes get their own section |
|  **Edit Notes** | Click a note to open a modal editor; changes save on close |
|  **Delete Notes** | Three-dot menu on each card reveals a "Delete note" option |
|  **Dark / Light Mode** | Toggle from the settings menu; preference persists across sessions |
|  **Drag & Drop** | Drag cards to reorder them , native HTML5 Drag API, no library needed |
|  **Persistent Storage** | All notes and theme preference saved to `localStorage` |
|  **Responsive** | Works on desktop, tablet, and mobile |

---
## Project Structure

```
keep-react/
├── public/
│   └── index.html          # HTML shell — loads Material Symbols font
│
├── src/
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles, CSS variables (light + dark)
│   │
│   ├── App.js              # Root — all shared state + business logic
│   │
│   ├── Navbar.js           # Top bar: logo, search, settings, dark toggle
│   ├── Navbar.css
│   │
│   ├── Sidebar.js          # Collapsible left nav (expands on hover)
│   ├── Sidebar.css
│   │
│   ├── Form.js             # Note creation form (collapsed ↔ expanded)
│   ├── Form.css
│   │
│   ├── Notes.js            # Note grid — drag events + section labels
│   ├── Notes.css
│   │
│   ├── Note.js             # Single note card — pin, archive, delete, drag
│   ├── Note.css
│   │
│   ├── Modal.js            # Edit-note overlay
│   └── Modal.css
│
├── package.json
└── README.md
```

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node) or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/keep-react.git
cd keep-react

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

The app will open at **http://localhost:3000** automatically.

### Build for Production

```bash
npm run build
```

Outputs an optimised production bundle to the `build/` folder.



---

##  Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| CSS Custom Properties | Theming system (dark / light mode) |
| HTML5 Drag and Drop API | Note reordering |
| `localStorage` | Persisting notes and theme preference |
| [Material Symbols](https://fonts.google.com/icons) | Icon set (variable font) |
| [Google Fonts](https://fonts.google.com/) | Typography |

No UI component libraries. No state management libraries. Just React and the browser platform.

---


##  License

This project is for educational purposes. Google Keep is a product of Google LLC — this clone is not affiliated with or endorsed by Google.

---


