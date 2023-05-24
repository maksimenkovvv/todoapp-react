import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');
  const maxId = useRef(1);

  App.defaultProps = {
    todoData: [],
    deleteItem: () => {},
    editItem: () => {},
    filter: 'all',
    filterChange: () => {},
    todoCount: 0,
  };

  App.propTypes = {
    todoData: PropTypes.array,
    editItem: PropTypes.func,
    deleteItem: PropTypes.func,
    filter: PropTypes.string,
    filterChange: PropTypes.func,
    todoCount: PropTypes.number,
  };

  const createTodoItem = (label, min, sec) => {
    return {
      id: maxId.current++,
      label,
      done: false,
      edit: false,
      min,
      sec,
    };
  };

  const addTodoItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);

    setTodoData((prevTodoData) => {
      const newArr = [...prevTodoData, newItem];
      return newArr;
    });
  };

  const editItem = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      };

      let newTodoData = [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)];

      return newTodoData;
    });
  };

  const onSubmitEdit = (event, id) => {
    event.preventDefault();
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((item) => item.id === id);
      const oldItem = prevTodoData[idx];

      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
        label: event.target[0].value,
      };

      let newTodoData = [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)];

      return newTodoData;
    });
  };

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);

      let newArray = [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];

      return newArray;
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) => {
      return toggleProperty(prevTodoData, id, 'done');
    });
  };

  const filterItems = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const clearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((element) => !element.done));
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <NewTaskForm addTodoItem={addTodoItem} />
      <TaskList
        todoData={filterItems(todoData, filter)}
        deleteItem={deleteItem}
        editItem={editItem}
        onSubmitEdit={onSubmitEdit}
        onToggleDone={onToggleDone}
      />
      <Footer
        todoData={todoData}
        todoCount={todoCount}
        filter={filter}
        filterChange={setFilter}
        deleteItem={deleteItem}
        clearCompleted={clearCompleted}
      />
    </section>
  );
}
