import NewTodo from '../Todo/NewTodo';
import Header from '../UI/Header';
import './Main.css';
import MainContent from '../Todo/MainContent';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const Main = () => {
  const [todo, setTodo] = useState(() => {
    const localValue = localStorage.getItem('Todo');
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });
  const [nextId, setNextId] = useState(todo[0] ? todo[0].id + 1 : 0);
  const [checked] = useState(false);

  const todoChangeHandler = (value) => {
    setTodo((prevTodo) => {
      const newItem = {
        value,
        checked,
        id: nextId,
      };
      setNextId((prevId) => prevId + 1);
      return [newItem, ...prevTodo];
    });
  };

  useEffect(() => localStorage.setItem('Todo', JSON.stringify(todo)), [todo]);

  const todoRemoveHandler = () => {
    setTodo((prevTodo) => {
      return prevTodo.filter((todo) => !todo.checked);
    });
  };

  return (
    <main className="main">
      <div className="container">
        <Header />
        <main className="container__main">
          <NewTodo onTodoChange={todoChangeHandler} />
          {todo.length > 0 ? (
            <MainContent todoList={todo} onRemove={todoRemoveHandler} />
          ) : (
            <p className="alert">Create a new to-do task</p>
          )}
        </main>
        {todo.length > 1 && <Footer />}
      </div>
    </main>
  );
};

export default Main;
