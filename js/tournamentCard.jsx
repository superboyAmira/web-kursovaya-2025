import React from 'react';

const STATUS_OPTIONS = [
  { value: 'active',     label: 'Активировать'     },
  { value: 'in_progress', label: 'В прогресс'       },
  { value: 'archive',     label: 'В архив'          },
];

export default function TournamentCard({ data, onDelete, onChangeState }) {
  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p><b>Дата:</b> {new Date(data.date).toLocaleString()}</p>
      <p><b>Место:</b> {data.location}</p>
      <p><b>Организатор:</b> {data.organizer}</p>

      <div className="actions">
        {STATUS_OPTIONS
          .filter(opt => opt.value !== data.status)
          .map(opt => (
            <button
              key={opt.value}
              className={opt.value === 'archive' ? 'archive' : ''}
              onClick={() => onChangeState(opt.value)}
            >
              {opt.label}
            </button>
          ))
        }

        <button className="delete" onClick={onDelete}>Удалить</button>
      </div>
    </div>
  );
}
