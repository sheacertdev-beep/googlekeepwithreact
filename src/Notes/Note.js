import { useState, useRef, useEffect } from "react";
import "./Note.css";

export default function Note({
  note,
  onDelete,
  onPin,
  onArchive,
  onOpen,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  isDragging,
  isDragOver,
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  // Close more-menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (moreOpen && moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [moreOpen]);

  const handleNoteClick = (e) => {
    // Don't open modal if interacting with footer controls
    if (
      e.target.closest(".note__pin") ||
      e.target.closest(".note__footer") ||
      e.target.closest(".more-menu")
    ) return;
    onOpen(note);
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    onPin(note.id);
  };

  const handleArchiveClick = (e) => {
    e.stopPropagation();
    onArchive(note.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setMoreOpen(false);
    onDelete(note.id);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setMoreOpen((o) => !o);
  };

  const FOOTER_ICONS = [
    { icon: "add_alert", tip: "Remind me" },
    { icon: "person_add", tip: "Collaborator" },
    { icon: "image", tip: "Add image" },
  ];

  return (
    <div
      className={`note ${isDragging ? "dragging" : ""} ${isDragOver ? "drag-over" : ""}`}
      onClick={handleNoteClick}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      role="button"
      tabIndex={0}
      aria-label={`Note: ${note.title || note.text}`}
    >
      {/* Pin button */}
      <button
        className={`icon-btn note__pin ${note.pinned ? "pinned" : ""}`}
        onClick={handlePinClick}
        aria-label={note.pinned ? "Unpin note" : "Pin note"}
        aria-pressed={note.pinned}
      >
        <span className="material-symbols-outlined">push_pin</span>
      </button>

      {/* Content */}
      {note.title && <div className="note__title">{note.title}</div>}
      <div className="note__text">{note.text}</div>

      {/* Footer toolbar */}
      <div className="note__footer">
        {FOOTER_ICONS.map(({ icon, tip }) => (
          <div className="tooltip-wrap" key={icon}>
            <button className="icon-btn" aria-label={tip} onClick={(e) => e.stopPropagation()}>
              <span className="material-symbols-outlined">{icon}</span>
            </button>
            <span className="tip">{tip}</span>
          </div>
        ))}

        {/* Archive */}
        <div className="tooltip-wrap">
          <button className="icon-btn" aria-label="Archive" onClick={handleArchiveClick}>
            <span className="material-symbols-outlined">archive</span>
          </button>
          <span className="tip">Archive</span>
        </div>

        {/* More menu */}
        <div className="more-menu-wrapper" ref={moreRef}>
          <div className="tooltip-wrap">
            <button className="icon-btn" aria-label="More options" onClick={handleMoreClick}>
              <span className="material-symbols-outlined">more_vert</span>
            </button>
            <span className="tip">More</span>
          </div>
          <div className={`more-menu ${moreOpen ? "open" : ""}`}>
            <button className="more-menu__item" onClick={handleDeleteClick}>
              Delete note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
