import { Fragment } from 'react';
import Button from '../UI/Button';
import './Tools.css';

const Tools = ({ leftItems, onRenderTodo }) => {
  const screenWidth = window.screen.width;
  const widthCheck = screenWidth <= 375;

  const filterContainer = (
    <div className={`${widthCheck && 'mobile-style'} filter-container`}>
      <Button onClick={onRenderTodo[0]}>All</Button>
      <Button onClick={onRenderTodo[1]}>Active</Button>
      <Button onClick={onRenderTodo[2]}>Completed</Button>
    </div>
  );

  return (
    <Fragment>
      <div className="content__tools">
        <span className="tools__text tools-style">
          {leftItems.length} items left
        </span>
        {!widthCheck && filterContainer}
        <Button extraClass="clear" onClick={onRenderTodo[3]}>
          Clear Completed
        </Button>
      </div>
      {widthCheck && filterContainer}
    </Fragment>
  );
};

export default Tools;
