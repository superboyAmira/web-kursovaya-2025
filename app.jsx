import React, { useEffect, useState } from 'react';
import TournamentCard from './js/tournamentCard';
import TournamentForm from './js/tournamentForm';
import './styles/styles.css';

export default function App() {
  const [tournaments, setTournaments] = useState([]);
  const conn = 'http://localhost:8080'

  useEffect(() => {
    fetch(conn + '/api/tournaments')
      .then(res => res.json())
      .then(setTournaments)
      .catch(console.error);
  }, []);

  const createTournament = async (newT) => {
    const res = await fetch(conn + '/api/tournaments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newT),
    });
    const saved = await res.json();
    setTournaments(prev => [...prev, saved]);
  };

  const changeTournamentState = async (id, newState) => {
    await fetch(`${conn}/api/tournaments/${id}?state=${newState}`, {
      method: 'PATCH'
    });
    setTournaments(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: newState } : t
      )
    );
  };

  const deleteTournament = async (id) => {
    await fetch(conn + `/api/tournaments/${id}`, { method: 'DELETE' });
    setTournaments(prev => prev.filter(t => t.id !== id));
  };

  const active = tournaments.filter(t => t.status === 'active');
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
            onChangeState={(newState) => changeTournamentState(t.id, newState)}
          />
        ))}
      </div>

      <h2>Архив</h2>
      <div className="grid">
        {archived.map(t => (
          <TournamentCard
            key={t.id}
            data={t}
            onDelete={() => deleteTournament(t.id)}
            onChangeState={(newState) => changeTournamentState(t.id, newState)}
          />
        ))}
      </div>
      <h2>В прогрессе</h2>
      <div className="grid">
        {inprogress.map(t => (
          <TournamentCard
            key={t.id}
            data={t}
            onDelete={() => deleteTournament(t.id)}
            onChangeState={(newState) => changeTournamentState(t.id, newState)}
          />
        ))}
      </div>
    </div>
  );
}
