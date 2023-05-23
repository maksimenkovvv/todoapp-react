import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import RU from 'date-fns/locale/en-AU';

import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.label,
      totalTime: props.min * 60 + props.sec,
      remainingTime: props.min * 60 + props.sec,
      isPlaying: false,
    };
  }

  static defaultProps = {
    date: PropTypes.instanceOf(Date),
  };

  setTask = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.isPlaying) {
        this.setState((prevState) => ({
          remainingTime: prevState.remainingTime > 0 ? prevState.remainingTime - 1 : 0,
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleStart = () => {
    this.setState({ isPlaying: true });
  };

  handlePause = () => {
    this.setState({ isPlaying: false });
  };

  handleReset = () => {
    this.setState({
      totalTime: this.props.minutes * 60 + this.props.seconds,
      remainingTime: this.props.minutes * 60 + this.props.seconds,
      isPlaying: false,
    });
  };

  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  render() {
    const { onToggleDone, deleteItem, editItem, onSubmitEdit, edit, label, done, id } = this.props;
    const { value, setTask, remainingTime } = this.state;

    const time = formatDistanceToNow(new Date(), {
      includeSeconds: false,
      locale: RU,
      addSuffix: true,
    });

    let classNames = '';

    return edit ? (
      <li className="editing">
        <form onSubmit={onSubmitEdit}>
          <input
            id={id}
            key={id}
            className="edit"
            type="text"
            defaultValue={value}
            placeholder={this.label}
            onChange={setTask}
            autoFocus
          />
        </form>
      </li>
    ) : (
      <li className={done ? (classNames += 'completed') : classNames}>
        <div className="view">
          <input id={id} key={id} className="toggle" type="checkbox" onClick={onToggleDone} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="description-info">
              <button className="icon icon-play" onClick={this.handleStart} />
              <button className="icon icon-pause" onClick={this.handlePause} />
              <span className="created">
                <span className="timer">{this.formatTime(remainingTime)}</span>
              </span>
            </span>
            <span className="created">created {time}</span>
          </label>

          <button type="button" className="icon icon-edit" onClick={editItem}></button>
          <button type="button" className="icon icon-destroy" onClick={deleteItem}></button>
        </div>
      </li>
    );
  }
}
