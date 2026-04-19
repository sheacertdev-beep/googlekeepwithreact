import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Form from "./Form/Form";
import Notes from "./Notes/Notes";
import Modal from "./Modal/Modal";
import "./index.css";

// ── tiny ID generator (no external dep) ──────────────────────────────────────
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// ── helpers ──────────────────────────────────────────────────────────────────
const loadNotes = () => {
  try {
    const raw = localStorage.getItem("keep_notes");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveNotes = (notes) => {
  localStorage.setItem("keep_notes", JSON.stringify(notes));
};

const loadTheme = () => localStorage.getItem("keep_theme") || "light";

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [notes, setNotes] = useState(() =>
    loadNotes().map((n) => ({ ...n, pinned: n.pinned === true }))
  );
  const [darkMode, setDarkMode] = useState(() => loadTheme() === "dark");
  const [openNote, setOpenNote] = useState(null); // note being edited in modal
  const [searchQuery, setSearchQuery] = useState("");

  // Apply dark-mode class on <body>
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("keep_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Persist notes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const addNote = ({ title, text }) => {
    if (!text.trim()) return;
    setNotes((prev) => [...prev, { id: uid(), title, text, pinned: false }]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const pinNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const archiveNote = (id) => {
    // For now, archiving removes the note (same as original)
    deleteNote(id);
  };

  const editNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  // ── Modal handlers ────────────────────────────────────────────────────────
  const handleOpenNote = (note) => setOpenNote(note);

  const handleCloseModal = ({ title, text, pinned }) => {
    if (openNote) {
      editNote(openNote.id, { title, text, pinned });
    }
    setOpenNote(null);
  };

  // ── Drag-and-drop reorder ─────────────────────────────────────────────────
  const reorderNotes = (draggedId, targetId) => {
    if (draggedId === targetId) return;
    setNotes((prev) => {
      const next = [...prev];
      const fromIdx = next.findIndex((n) => n.id === draggedId);
      if (fromIdx === -1) return prev;
      const [item] = next.splice(fromIdx, 1);
      if (!targetId) {
        next.push(item);
      } else {
        const toIdx = next.findIndex((n) => n.id === targetId);
        next.splice(toIdx === -1 ? next.length : toIdx, 0, item);
      }
      return next;
    });
  };

  // ── Sort: pinned first, then preserve user order ─────────────────────────
  const sortedNotes = [
    ...notes.filter((n) => n.pinned),
    ...notes.filter((n) => !n.pinned),
  ];

  // ── Search filter ─────────────────────────────────────────────────────────
  const filteredNotes = searchQuery.trim()
    ? sortedNotes.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sortedNotes;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <Sidebar />

      <main style={{ paddingLeft: 80, paddingRight: 8, maxWidth: "100%" }}>
        {!searchQuery && <Form onAddNote={addNote} />}

        <Notes
          notes={filteredNotes}
          onDelete={deleteNote}
          onPin={pinNote}
          onArchive={archiveNote}
          onOpenNote={handleOpenNote}
          onReorder={reorderNotes}
        />
      </main>

      {openNote && (
        <Modal note={openNote} onClose={handleCloseModal} />
      )}
    </>
  );
}
