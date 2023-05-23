import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTodoItem: () => {},
  };

  static propTypes = {
    addTodoItem: PropTypes.func,
  };

  state = {
    label: '',
    min: null,
    sec: null,
    timeLeft: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label && this.state.label.trim() !== '') {
      const newItem = {
        label: this.state.label,
        min: parseInt(this.state.min),
        sec: parseInt(this.state.sec),
      };
      this.props.addTodoItem(newItem.label, newItem.min, newItem.sec);
    }
    this.setState({
      label: '',
      min: null,
      sec: null,
      timeLeft: '',
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: parseInt(e.target.value),
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: parseInt(e.target.value),
    });
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmit(e);
    }
  };
  render() {
    const { label, min, sec } = this.state;

    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form">
          <button type="button">
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.onLabelChange}
              onKeyDown={this.onKeyDown}
              value={label}
              autoFocus
              required
            />
            <input
              className="new-todo-form__timer"
              placeholder="Min"
              type="number"
              onChange={this.onMinChange}
              value={min !== null ? min : ''}
            />
            <input
              className="new-todo-form__timer"
              placeholder="Sec"
              type="number"
              onChange={this.onSecChange}
              value={sec !== null ? sec : ''}
            />
          </button>
        </form>
      </header>
    );
  }
}
