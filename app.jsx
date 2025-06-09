import React, { useEffect, useState } from 'react';
import TournamentCard from './js/tournamentCard';
import TournamentForm from './js/tournamentForm';
import './styles/styles.css';

export default function App() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch('/api/tournaments')
    // fetch('http://localhost:3000/tournaments')
      .then(res => res.json())
      .then(setTournaments)
      .catch(console.error);
  }, []);

  const createTournament = async (newT) => {
    const res = await fetch('/api/tournaments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newT),
    });
    const saved = await res.json();
    setTournaments(prev => [...prev, saved]);
  };

  const archiveTournament = async (id) => {
    await fetch(`/api/tournaments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'archive' }),
    });
    setTournaments(prev => prev.map(t => t.id === id ? { ...t, status: 'archive' } : t));
  };

  const deleteTournament = async (id) => {
    await fetch(`/api/tournaments/${id}`, { method: 'DELETE' });
    setTournaments(prev => prev.filter(t => t.id !== id));
  };

  const active = tournaments.filter(t => t.status !== 'archive');
  const archived = tournaments.filter(t => t.status === 'archive');
  const inprogress = tournaments.filter(t => t.status === 'in_progress');

  return (
    <div className="container">
      <h1>Расписание шахматных турниров</h1>

      <TournamentForm onCreate={createTournament} />

      <h2>Активные турниры</h2>
      <div className="grid">
        {active.map(t => (
          <TournamentCard
            key={t.id}
            data={t}
            onDelete={() => deleteTournament(t.id)}
            onArchive={() => archiveTournament(t.id)}
          />
        ))}
      </div>

      <h2>Архив</h2>
      <ul>
        {archived.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
      <h2>В прогрессе</h2>
      <ul>
        {inprogress.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
    </div>
  );
}
