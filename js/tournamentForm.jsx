import React, { useState } from 'react';

export default function TournamentForm({ onCreate }) {
  const [form, setForm] = useState({
    title: '',
    date: '', 
    location: '',
    organizer: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.date) return;

    const localDate = form.date; 
    const dateObj = new Date(localDate);
    const isoDate = dateObj.toISOString();

    onCreate({
      ...form,
      date: isoDate,
      status: 'active',
    });

    setForm({ title: '', date: '', location: '', organizer: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="datetime-local"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Локация"
        value={form.location}
        onChange={handleChange}
      />
      <input
        name="organizer"
        placeholder="Организатор"
        value={form.organizer}
        onChange={handleChange}
      />
      <button type="submit">Создать</button>
    </form>
  );
}
