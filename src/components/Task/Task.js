import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import RU from 'date-fns/locale/en-AU';

import './Task.css';

export default function Task(props) {
  const [value, setValue] = useState(props.label);
  const [remainingTime, setRemainingTime] = useState(props.min * 60 + props.sec);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        setRemainingTime((prevState) => (prevState > 0 ? prevState - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return ` ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const time = formatDistanceToNow(new Date(), {
    includeSeconds: false,
    locale: RU,
    addSuffix: true,
  });

  let classNames = '';

  return props.edit ? (
    <li className="editing">
      <form onSubmit={props.onSubmitEdit}>
        <input
          id={props.id}
          key={props.id}
          className="edit"
          type="text"
          defaultValue={value}
          placeholder={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
      </form>
    </li>
  ) : (
    <li className={props.done ? (classNames += 'completed') : classNames}>
      <div className="view">
        <input id={props.id} key={props.id} className="toggle" type="checkbox" onClick={props.onToggleDone} />
        <label htmlFor={props.id}>
          <span className="description">{props.label}</span>
          <span className="description-info">
            <button className="icon icon-play" onClick={handleStart} />
            <button className="icon icon-pause" onClick={handlePause} />
            <span className="created">
              <span className="timer">{formatTime(remainingTime)}</span>
            </span>
          </span>
          <span className="created">created {time}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={props.editItem}></button>
        <button type="button" className="icon icon-destroy" onClick={props.deleteItem}></button>
      </div>
    </li>
  );
}

Task.propTypes = {
  onToggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
};
