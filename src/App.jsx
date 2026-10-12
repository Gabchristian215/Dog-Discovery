import React, { useEffect, useRef, useState } from 'react';
import { banKey, fetchDog } from './dogApi.js';
import './App.css';

function PhotoCredit({ credit }) {
  if (!credit) return null;
  const author = credit.author || 'Image source';
  return (
    <p className="image-credit">
      Photo: {credit.sourceUrl ? <a href={credit.sourceUrl} target="_blank" rel="noreferrer">{author}</a> : author}
      {credit.license && <>{' · '}{credit.licenseUrl ? <a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a> : credit.license}</>}
    </p>
  );
}

export default function App() {
  const [dog, setDog] = useState(null);
  const [bans, setBans] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const request = useRef({ id: 0, controller: null });
  const bansRef = useRef([]);
  const historyIds = useRef([]);

  useEffect(() => () => request.current.controller?.abort(), []);

  function updateBans(nextBans) {
    bansRef.current = nextBans;
    setBans(nextBans);
    // Preferences may change while a request is pending. Discard that request.
    request.current.id += 1;
    request.current.controller?.abort();
    setLoading(false);
    setError('');
  }

  function toggleBan(attribute) {
    const key = banKey(attribute);
    const previous = bansRef.current;
    updateBans(previous.some((item) => banKey(item) === key)
      ? previous.filter((item) => banKey(item) !== key)
      : [...previous, attribute]);
  }

  async function discover() {
    request.current.controller?.abort();
    const controller = new AbortController();
    const id = request.current.id + 1;
    request.current = { id, controller };
    setLoading(true);
    setError('');
    try {
      const result = await fetchDog(bansRef.current, historyIds.current, controller.signal);
      if (id !== request.current.id || controller.signal.aborted) return;
      if (result.attributes.some((attribute) => bansRef.current.some((ban) => banKey(ban) === banKey(attribute)))) {
        throw new Error('Your preferences changed. Try discovering another dog.');
      }
      setDog(result);
      historyIds.current = [...historyIds.current, result.id];
      setHistory((previous) => [result, ...previous]);
    } catch (failure) {
      if (id !== request.current.id || controller.signal.aborted) return;
      setError(failure.message || 'Could not discover a dog. Please try again.');
    } finally {
      if (id === request.current.id) setLoading(false);
    }
  }

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
        <aside className="sidebar" aria-labelledby="ban-heading">
          <p className="section-kicker">Your preferences</p>
          <div className="panel-heading">
            <h2 id="ban-heading">Ban list</h2>
            <span className="count-badge">{bans.length}</span>
          </div>
          <p className="muted">Click an attribute on a dog to keep it out of future discoveries. Click a banned value to remove it.</p>
          <div className="ban-list" aria-live="polite">
            {bans.length === 0 ? <p className="empty-message">Nothing banned yet.</p> : bans.map((attribute) => (
              <button className="ban-chip" key={banKey(attribute)} onClick={() => toggleBan(attribute)} type="button" aria-label={`Remove ${attribute.label}: ${attribute.value} from ban list`}>
                <span className="ban-type">{attribute.label}</span>
                <span>{attribute.value}</span>
                <span className="ban-remove" aria-hidden="true">×</span>
              </button>
            ))}
          </div>
          {bans.length > 0 && <button className="clear-bans-button" type="button" onClick={() => updateBans([])}>Clear all bans</button>}
          <div className="sidebar-tip">
            <span aria-hidden="true">💡</span>
            <p>Use the ban list to fine-tune the dogs you discover.</p>
          </div>
        </aside>

        <section className="discovery-panel" aria-labelledby="discovery-heading">
          <div className="panel-heading result-heading">
            <div>
              <p className="section-kicker">Find a friend</p>
              <h2 id="discovery-heading">One dog at a time</h2>
            </div>
            <button className="discover-button" type="button" onClick={discover} disabled={loading}>
              {loading ? 'Finding a dog…' : 'Discover a dog'} <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="status-message" role="status">{loading ? 'Searching for a dog that matches your preferences…' : ''}</div>
          {error && <p className="error-message" role="alert">{error}</p>}
          {dog ? (
            <article className="dog-card">
              <div className="dog-image-wrap">
                <img className="dog-image" src={dog.imageUrl} alt={`A ${dog.name} dog`} />
                <PhotoCredit credit={dog.imageCredit} />
              </div>
              <div className="dog-details">
                <p className="section-kicker">Your discovery</p>
                <h3 className="dog-name">{dog.name}</h3>
                {dog.description && <p className="dog-description">{dog.description}</p>}
                <p className="muted">Tap any attribute to ban or unban its value.</p>
                <div className="attribute-list">
                  {dog.attributes.map((attribute) => {
                    const banned = bans.some((ban) => banKey(ban) === banKey(attribute));
                    return <button className={`attribute-button${banned ? ' is-banned' : ''}`} key={attribute.key} type="button" onClick={() => toggleBan(attribute)} aria-pressed={banned} aria-label={`${banned ? 'Unban' : 'Ban'} ${attribute.label}: ${attribute.value}`}>
                      <span className="attribute-label">{attribute.label}</span>
                      <span className="attribute-value">{attribute.value}</span>
                    </button>;
                  })}
                </div>
              </div>
            </article>
          ) : (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">🐾</div>
              <h3>Your next best friend is waiting.</h3>
              <p>Press the button to discover a random breed.</p>
            </div>
          )}
        </section>
      </div>

      <section className="history-section" aria-labelledby="history-heading">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Session history</p>
            <h2 id="history-heading">Previously discovered</h2>
          </div>
          <span className="history-note">{history.length} {history.length === 1 ? 'discovery' : 'discoveries'}</span>
        </div>
        {history.length === 0 ? <p className="empty-message history-empty">Your discoveries will appear here.</p> : (
          <div className="history-grid">
            {history.map((item, index) => <article className="history-card" key={`${item.id}-${history.length - index}`}>
              <img className="history-image" src={item.imageUrl} alt={`Previously discovered ${item.name}`} loading="lazy" />
              <div className="history-details">
                <PhotoCredit credit={item.imageCredit} />
                <h3>{item.name}</h3>
                <dl className="history-attributes">{item.attributes.map((attribute) => <div key={attribute.key}><dt>{attribute.label}</dt><dd>{attribute.value}</dd></div>)}</dl>
              </div>
            </article>)}
          </div>
        )}
      </section>
    </main>
  );
}
