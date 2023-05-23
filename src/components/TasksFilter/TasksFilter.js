import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    filterChange: () => {},
    filter: 'all',
  };

  static typeProps = {
    filter: PropTypes.string,
    filterChange: PropTypes.func,
  };

  render() {
    const { filter, filterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : '';

      return (
        <li className={clazz} key={name}>
          <button type="button" onClick={() => filterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];
}
