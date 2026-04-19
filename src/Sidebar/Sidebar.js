import { useState } from "react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { icon: "lightbulb", label: "Notes", active: true },
  { icon: "notifications", label: "Reminders" },
  { icon: "edit", label: "Edit Labels" },
  { icon: "archive", label: "Archive" },
  { icon: "delete", label: "Trash" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-label="Sidebar navigation"
    >
      {NAV_ITEMS.map(({ icon, label, active }) => (
        <button
          key={label}
          className={`sidebar__item ${active ? "active" : ""}`}
          aria-label={label}
          aria-current={active ? "page" : undefined}
        >
          <span className="icon-btn">
            <span className="material-symbols-outlined">{icon}</span>
          </span>
          <span className="sidebar__label">{label}</span>
        </button>
      ))}
    </aside>
  );
}
