import React from 'react';
import PropTypes from 'prop-types';

import './TaskList.css';

import Task from '../Task/Task';

function TaskList({ todoData, deleteItem, editItem, onSubmitEdit, onToggleDone }) {
  TaskList.defaultProps = {
    todoData: [],
    deleteItem: () => {},
    editItem: () => {},
    onSubmitEdit: () => {},
    onToggleDone: () => {},
    done: false,
  };

  TaskList.typeProps = {
    todoData: PropTypes.array,
    deleteItem: PropTypes.func,
    editItem: PropTypes.func,
    onSubmitEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    done: PropTypes.bool,
  };

  const elements = todoData.map((item) => {
    const { id, ...itemProps } = item;

    const min = parseInt(itemProps.min);
    const sec = parseInt(itemProps.sec);

    return (
      <Task
        {...itemProps}
        key={id}
        id={id}
        deleteItem={() => deleteItem(id)}
        editItem={() => editItem(id)}
        onSubmitEdit={(event) => onSubmitEdit(event, id)}
        done={item.done}
        onToggleDone={() => onToggleDone(id)}
        min={min}
        sec={sec}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
