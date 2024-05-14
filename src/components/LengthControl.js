import React from 'react';

const LengthControl = ({ id, title, length, increment, decrement }) => {
  return (
    <div className="col-6">
      <div id={`${id}-label`} className="h3">{title}</div>
      <div className="d-flex justify-content-center align-items-center">
        <button id={`${id}-decrement`} className="btn btn-secondary" onClick={decrement}>-</button>
        <div id={`${id}-length`} className="mx-3">{length}</div>
        <button id={`${id}-increment`} className="btn btn-secondary" onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default LengthControl;
