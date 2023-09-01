import './Button.css';

const Button = (props) => {
  return (
    <button
      className={`btn-reset tools__btn tools-style ${
        props.extraClass ? props.extraClass : ''
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
