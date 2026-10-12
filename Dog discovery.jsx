import React from 'react';
import './App.css';

function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Dog discovery</p>
          <h1>Puppy Dogs</h1>
          <p className="hero-copy">Discover your top dog and find a new favorite friend.</p>
        </div>
        <div className="hero-badge" aria-hidden="true">🐶</div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <p className="section-kicker">Your preferences</p>
          <div className="panel-heading">
            <h2>Ban list</h2>
            <span className="count-badge">0</span>
          </div>
          <p className="muted">Click an attribute on a dog to keep it out of future discoveries.</p>
          <div className="ban-list">
            <p className="empty-message">Nothing banned yet.</p>
          </div>
          <div className="sidebar-tip">
            <span aria-hidden="true">💡</span>
            <p>Use the ban list to fine-tune the dogs you discover.</p>
          </div>
        </aside>

        <section className="discovery-panel">
          <div className="panel-heading result-heading">
            <div>
              <p className="section-kicker">Find a friend</p>
              <h2>One dog at a time</h2>
            </div>
            <button className="discover-button" type="button">
              Discover a dog <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">🐾</div>
            <h3>Your next best friend is waiting.</h3>
            <p>Press the button to discover a random breed.</p>
          </div>
        </section>
      </div>

      <section className="history-section">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Session history</p>
            <h2>Previously discovered</h2>
          </div>
          <span className="history-note">0 discoveries</span>
        </div>
        <p className="empty-message history-empty">Your discoveries will appear here.</p>
      </section>
    </main>
  );
}

export default App;