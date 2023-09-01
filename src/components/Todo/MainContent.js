import { useEffect, useReducer, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from '../UI/TodoItem';
import Tools from './Tools';
import './MainContent.css';

const initialTask = {
  incompletedTasks: '',
  completedTasks: '',
  filterTasks: '',
};

const todoReducer = (state, action) => {
  if (action.type === 'INCOMPLETE') {
    return {
      incompletedTasks: action.incompletedTasks,
      completedTasks: state.completedTasks,
      filterTasks: state.filterTasks,
    };
  }
  if (action.type === 'COMPLETE') {
    return {
      incompletedTasks: state.incompletedTasks,
      completedTasks: action.completedTasks,
      filterTasks: state.filterTasks,
    };
  }
  if (action.type === 'FILTER') {
    return {
      incompletedTasks: state.incompletedTasks,
      completedTasks: action.completedTasks
        ? action.completedTasks
        : state.completedTasks,
      filterTasks: action.filterTasks,
    };
  }
  return initialTask;
};

const MainContent = ({ todoList, onRemove }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [todoState, dispatch] = useReducer(todoReducer, initialTask);

  useEffect(() => {
    dispatch({ type: 'FILTER', filterTasks: todoList });
  }, [todoList]);

  const manageTaskHandler = (value) => {
    setIsCompleted(value);
    dispatch({
      type: 'INCOMPLETE',
      incompletedTasks: todoList.filter((todo) => !todo.checked),
    });
    dispatch({
      type: 'COMPLETE',
      completedTasks: todoList.filter((todo) => todo.checked),
    });
  };

  const allTasksHandler = () =>
    dispatch({ type: 'FILTER', filterTasks: todoList });
  const incompletedTasksHandler = () =>
    dispatch({ type: 'FILTER', filterTasks: todoState.incompletedTasks });
  const completedTasksHandler = () =>
    dispatch({ type: 'FILTER', filterTasks: todoState.completedTasks });

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todoState.filterTasks);
    const [reorderdItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderdItem);
    dispatch({ type: 'FILTER', filterTasks: items });
  };

  const todoRenderHandler = () => {
    if (!todoState.filterTasks || todoState.filterTasks.length === 0)
      return <p className="empty">No todos</p>;

    return todoState.filterTasks.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
        {(provided) => (
          <TodoItem
            innerRef={provided.innerRef}
            provided={provided}
            id={item.id}
            task={item}
            onTaskChange={manageTaskHandler}
          />
        )}
      </Draggable>
    ));
  };

  return (
    <div className="main__content">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ul
              className="list-reset content__list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todoRenderHandler()}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Tools
        leftItems={
          todoState.incompletedTasks.length === 0 && !todoState.incompletedTasks
            ? todoList
            : todoState.incompletedTasks
        }
        onRenderTodo={[
          allTasksHandler,
          incompletedTasksHandler,
          completedTasksHandler,
          onRemove,
        ]}
      />
    </div>
  );
};

export default MainContent;
