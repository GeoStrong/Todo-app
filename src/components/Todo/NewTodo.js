import { useRef } from 'react';
import './NewTodo.css';
import checkIcon from '../../assets/icon-check.svg';

const NewTodo = (props) => {
  const inputRef = useRef();

  const inputBlur = () => {
    inputRef.current.focus();
  };

  const formSubmission = (event) => {
    const inputValue = inputRef.current.value;
    event.preventDefault();
    if (inputValue.trim() === '') return;
    props.onTodoChange(inputValue);
    inputRef.current.value = '';
  };

  return (
    <form
      onSubmit={formSubmission}
      onClick={inputBlur}
      className="main__new-subject todo-element"
    >
      <label
        className="custom-checkbox"
        onClick={formSubmission}
        htmlFor="submit"
      >
        <input type="checkbox" id="submit" className="checkbox" />
        <span className="checkmark">
          <img src={checkIcon} alt="check" />
        </span>
      </label>
      <input
        ref={inputRef}
        type="text"
        placeholder="Create a new todo…"
        className="main__input"
      />
    </form>
  );
};

export default NewTodo;
