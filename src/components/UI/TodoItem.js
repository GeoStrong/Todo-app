import './TodoItem.css';
import checkIcon from '../../assets/icon-check.svg';

const TodoItem = ({ innerRef, provided, id, task, onTaskChange }) => {
  const checkHandler = (event) => {
    if (event.target.checked) {
      task.checked = true;
      onTaskChange(true);
    } else {
      task.checked = false;
      onTaskChange(false);
    }
  };

  return (
    <li
      className="content__item"
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="todo-element">
        <label className="custom-checkbox" htmlFor={id}>
          <input
            className="checkbox"
            type="checkbox"
            onClick={checkHandler}
            id={id}
            checked={task.checked}
            readOnly
          />
          <span className="checkmark">
            <img src={checkIcon} alt="check" />
          </span>
        </label>
        <h2 className={`subject ${task.checked && 'completed'}`}>
          {task.value}
        </h2>
      </div>
    </li>
  );
};

export default TodoItem;
