import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

export default class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
    filter: 'all',
  };

  static propTypes = {
    todoCount: PropTypes.number,
    filter: PropTypes.string,
    filterChange: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func,
  };

  render() {
    const { todoCount, filter, filterChange, clearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} filterChange={filterChange} />
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
