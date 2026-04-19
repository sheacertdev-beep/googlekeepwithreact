import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ darkMode, onToggleDark, searchQuery, onSearch }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <button className="icon-btn">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <img
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt="Keep logo"
        />
        <span className="navbar__logo-text">Keep</span>
      </div>

      {/* Search */}
      <div className="navbar__search">
        <button className="icon-btn">
          <span className="material-symbols-outlined">search</span>
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search notes"
        />
        {searchQuery && (
          <button className="icon-btn" onClick={() => onSearch("")} aria-label="Clear search">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {/* Right actions */}
      <div className="navbar__actions">
        <div className="tooltip-wrap hide-sm">
          <button className="icon-btn" aria-label="Refresh">
            <span className="material-symbols-outlined">refresh</span>
          </button>
          <span className="tip">Refresh</span>
        </div>

        <div className="tooltip-wrap hide-sm">
          <button className="icon-btn" aria-label="List view">
            <span className="material-symbols-outlined">view_agenda</span>
          </button>
          <span className="tip">List view</span>
        </div>

        {/* Settings */}
        <div className="settings-wrapper" ref={settingsRef}>
          <div className="tooltip-wrap">
            <button
              className="icon-btn"
              aria-label="Settings"
              onClick={() => setSettingsOpen((o) => !o)}
            >
              <span className="material-symbols-outlined">settings</span>
            </button>
            <span className="tip">Settings</span>
          </div>
          <div className={`settings-dropdown ${settingsOpen ? "open" : ""}`}>
            <button
              className="settings-dropdown__item"
              onClick={() => {
                onToggleDark();
                setSettingsOpen(false);
              }}
            >
              {darkMode ? "Disable Dark Theme" : "Enable Dark Theme"}
            </button>
          </div>
        </div>

        <div className="tooltip-wrap">
          <button className="icon-btn" aria-label="Apps">
            <span className="material-symbols-outlined">apps</span>
          </button>
          <span className="tip">Apps</span>
        </div>

        <div className="tooltip-wrap">
          <button className="icon-btn" aria-label="Account">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <span className="tip">Account</span>
        </div>
      </div>
    </nav>
  );
}
