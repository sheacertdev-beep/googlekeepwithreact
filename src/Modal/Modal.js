import { useState, useEffect, useRef } from "react";
import "./Modal.css";

export default function Modal({ note, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [text, setText] = useState(note?.text || "");
  const [pinned, setPinned] = useState(note?.pinned || false);
  const overlayRef = useRef(null);

  // Sync when a different note is opened
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setText(note.text || "");
      setPinned(note.pinned || false);
    }
  }, [note]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [title, text, pinned]);

  if (!note) return null;

  const handleClose = () => {
    onClose({ title: title.trim(), text: text.trim(), pinned });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const ICON_ACTIONS = [
    { icon: "add_alert", tip: "Remind me" },
    { icon: "person_add", tip: "Collaborator" },
    { icon: "image", tip: "Add image" },
    { icon: "archive", tip: "Archive" },
    { icon: "more_vert", tip: "More" },
    { icon: "undo", tip: "Undo" },
    { icon: "redo", tip: "Redo" },
  ];

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Edit note"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-form">
          <input
            className="modal__title-input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Note title"
          />
          <input
            className="modal__text-input"
            type="text"
            placeholder="Take a note…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            aria-label="Note text"
          />

          <div className="modal__footer">
            <div className="modal__icons">
              {/* Pin toggle */}
              <div className="tooltip-wrap">
                <button
                  className={`icon-btn modal-pin-btn ${pinned ? "pinned" : ""}`}
                  onClick={() => setPinned((p) => !p)}
                  aria-label={pinned ? "Unpin note" : "Pin note"}
                  aria-pressed={pinned}
                >
                  <span className="material-symbols-outlined">push_pin</span>
                </button>
                <span className="tip">{pinned ? "Unpin note" : "Pin note"}</span>
              </div>

              {ICON_ACTIONS.map(({ icon, tip }) => (
                <div className="tooltip-wrap" key={icon}>
                  <button className="icon-btn" aria-label={tip}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                  <span className="tip">{tip}</span>
                </div>
              ))}
            </div>

            <button className="modal__close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
