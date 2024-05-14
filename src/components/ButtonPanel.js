import React from 'react';
import Button from './Button';

const ButtonPanel = ({ handleButtonClick }) => {
  // Function to create digit buttons to avoid repetition
  const createDigitButtons = () => {
    const digits = [];
    const ids = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    for (let i = 0; i < 10; i++) {
      digits.push(
        <Button 
          key={i} 
          label={String(i)} 
          id={ids[i]} 
          onClick={() => handleButtonClick(String(i))} 
        />
      );
    }
    return digits;
  };

  return (
    <div className="button-panel">
      {createDigitButtons()}
      <Button label="+" id="add" onClick={() => handleButtonClick('+')} />
      <Button label="-" id="subtract" onClick={() => handleButtonClick('-')} />
      <Button label="*" id="multiply" onClick={() => handleButtonClick('*')} />
      <Button label="/" id="divide" onClick={() => handleButtonClick('/')} />
      <Button label="=" id="equals" onClick={() => handleButtonClick('=')} />
      <Button label="C" id="clear" onClick={() => handleButtonClick('C')} />
      <Button label="." id="decimal" onClick={() => handleButtonClick('.')} />
    </div>
  );
}

export default ButtonPanel;
