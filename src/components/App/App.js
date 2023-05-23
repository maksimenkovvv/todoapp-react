import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [],
      filter: 'all',
    };
  }

  static defaultProps = {
    todoData: [],
    deleteItem: () => {},
    editItem: () => {},
    filter: 'all',
    filterChange: () => {},
    todoCount: 0,
  };

  static propTypes = {
    todoData: PropTypes.array,
    editItem: PropTypes.func,
    deleteItem: PropTypes.func,
    filter: PropTypes.string,
    filterChange: PropTypes.func,
    todoCount: PropTypes.number,
  };

  maxId = 1;

  createTodoItem(label, min, sec) {
    return {
      id: this.maxId++,
      label,
      done: false,
      edit: false,
      min,
      sec,
    };
  }

  addTodoItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  editItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      };

      let newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newTodoData,
      };
    });
  };

  onSubmitEdit = (event, id) => {
    event.preventDefault();
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const oldItem = todoData[idx];

      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
        label: event.target[0].value,
      };

      let newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newTodoData,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      let newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  filter(items, filter) {
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
  }

  filterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted() {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((element) => !element.done),
    }));
  }

  render() {
    const { todoData, filter } = this.state;
    console.log(todoData);
    const filterItems = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <NewTaskForm addTodoItem={this.addTodoItem} />

        <TaskList
          todoData={filterItems}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
          onSubmitEdit={this.onSubmitEdit}
          onToggleDone={this.onToggleDone}
        />

        <Footer
          todoData={todoData}
          todoCount={todoCount}
          filter={filter}
          filterChange={this.filterChange}
          deleteItem={this.deleteItem}
          clearCompleted={this.clearCompleted.bind(this)}
        />
      </section>
    );
  }
}
