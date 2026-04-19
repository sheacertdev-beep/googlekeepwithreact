import { useState, useRef, useEffect } from "react";
import "./Form.css";

export default function Form({ onAddNote }) {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const containerRef = useRef(null);

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (active && containerRef.current && !containerRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active, title, text]);

  const handleClose = () => {
    if (text.trim()) {
      onAddNote({ title: title.trim(), text: text.trim() });
    }
    setTitle("");
    setText("");
    setActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
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
    <div className="form-container" ref={containerRef}>
      {!active ? (
        /* ── Inactive / collapsed ── */
        <div className="form-inactive" onClick={() => setActive(true)} role="button" tabIndex={0}>
          <span className="form-inactive__placeholder">Take a note…</span>
          <div className="form-inactive__actions">
            <div className="tooltip-wrap">
              <button className="icon-btn" aria-label="New list" onClick={(e) => { e.stopPropagation(); setActive(true); }}>
                <span className="material-symbols-outlined">check_box</span>
              </button>
              <span className="tip">New list</span>
            </div>
            <div className="tooltip-wrap">
              <button className="icon-btn" aria-label="New drawing" onClick={(e) => { e.stopPropagation(); setActive(true); }}>
                <span className="material-symbols-outlined">brush</span>
              </button>
              <span className="tip">New drawing</span>
            </div>
            <div className="tooltip-wrap">
              <button className="icon-btn" aria-label="New image note" onClick={(e) => { e.stopPropagation(); setActive(true); }}>
                <span className="material-symbols-outlined">image</span>
              </button>
              <span className="tip">New image note</span>
            </div>
          </div>
        </div>
      ) : (
        /* ── Active / expanded ── */
        <form className="form-active" onSubmit={handleSubmit}>
          <input
            className="form-active__title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Note title"
          />
          <input
            className="form-active__text"
            type="text"
            placeholder="Take a note…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            aria-label="Note text"
          />
          <div className="form-active__footer">
            <div className="form-active__icons">
              {ICON_ACTIONS.map(({ icon, tip }) => (
                <div className="tooltip-wrap" key={icon}>
                  <button type="button" className="icon-btn" aria-label={tip}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                  <span className="tip">{tip}</span>
                </div>
              ))}
            </div>
            <button type="submit" className="form-close-btn">
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
