import React from 'react';

export default function TournamentCard({ data, onDelete, onArchive }) {
  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p><b>Дата:</b> {new Date(data.date).toLocaleString()}</p>
      <p><b>Место:</b> {data.location}</p>
      <p><b>Организатор:</b> {data.organizer}</p>

      <div className="actions">
        <button className="archive" onClick={onArchive}>Архив</button>
        <button className="delete" onClick={onDelete}>Удалить</button>
      </div>
    </div>
  );
}
