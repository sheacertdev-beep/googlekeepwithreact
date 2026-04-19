import { useState } from "react";
import Note from "./Note";
import "./Notes.css";

export default function Notes({ notes, onDelete, onPin, onArchive, onOpenNote, onReorder }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const pinned = notes.filter((n) => n.pinned);
  const others = notes.filter((n) => !n.pinned);

  const handleDragStart = (e, id) => {
    // Prevent dragging the pin button itself
    if (e.target.closest(".note__pin")) {
      e.preventDefault();
      return;
    }
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (id !== draggedId) setDragOverId(id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId = draggedId || e.dataTransfer.getData("text/plain");
    if (sourceId && sourceId !== targetId) {
      onReorder(sourceId, targetId);
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const renderNote = (note) => (
    <Note
      key={note.id}
      note={note}
      onDelete={onDelete}
      onPin={onPin}
      onArchive={onArchive}
      onOpen={onOpenNote}
      isDragging={draggedId === note.id}
      isDragOver={dragOverId === note.id}
      onDragStart={(e) => handleDragStart(e, note.id)}
      onDragOver={(e) => handleDragOver(e, note.id)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, note.id)}
      onDragEnd={handleDragEnd}
    />
  );

  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <span className="material-symbols-outlined">lightbulb_2</span>
        <p>Notes that you add appear here</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {pinned.length > 0 && (
        <>
          <div className="notes-section-label">Pinned</div>
          {pinned.map(renderNote)}
          {others.length > 0 && <div className="notes-section-label">Others</div>}
        </>
      )}
      {others.map(renderNote)}
    </div>
  );
}
