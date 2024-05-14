import React from 'react';

const Controls = ({ startStop, reset, isRunning }) => {
  return (
    <div className="controls mt-3">
      <button id="start_stop" className="btn btn-primary mx-2" onClick={startStop}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button id="reset" className="btn btn-danger mx-2" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;
