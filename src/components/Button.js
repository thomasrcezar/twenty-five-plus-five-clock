import React from 'react';
import './Button.css';

const Button = ({ label, onClick, id }) => {
  return (
    <button className="btn btn-secondary" id={id} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
