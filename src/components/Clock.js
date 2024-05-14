import React from 'react';

const Clock = ({ label, timeLeft }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div id="clock">
      <h2 id="timer-label">{label}</h2>
      <div id="time-left">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default Clock;
