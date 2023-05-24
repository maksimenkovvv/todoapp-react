import React, { useState } from 'react';
import './NewTaskForm.css';

export default function NewTaskForm({ addTodoItem }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let minutes = parseInt(min);
    let seconds = parseInt(sec);
    if (isNaN(minutes)) {
      minutes = 0;
    }
    if (isNaN(seconds)) {
      seconds = 0;
    }
    addTodoItem(label, minutes, seconds);
    setLabel('');
    setMin('');
    setSec('');
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form">
        <button type="button">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={onLabelChange}
            onKeyDown={onKeyDown}
            value={label}
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            onChange={onMinChange}
            value={min !== null ? min : ''}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            onChange={onSecChange}
            value={sec !== null ? sec : ''}
          />
        </button>
      </form>
    </header>
  );
}
