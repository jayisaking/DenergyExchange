import React, { useState } from 'react';

export const InputField = ({ label, type,placeholder, value, setValue }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{ label }</label>
      <input
        type = { type }
        placeholder={ placeholder }
        value = { value }
        onChange = { (event) => setValue(event.target.value) }
        className ="w-full border border-gray-300 p-2 rounded"
      />
    </div>
  );
};
export const Button = ({ onClick, text, className }) => {
    return (
      <button
        onClick={onClick}
        className = {`bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded ${className}`}
      >
        {text}
      </button>
    );
};

export const Dropdown = ({ label, options, value, onChange, setValue }) => {
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
    const handleDropdownChange = (event) => {
      const selectedValue = event.target.value;
      setValue(selectedValue);
      setIsButtonEnabled(selectedValue === options[0]);
      onChange(event);
    };
  
    const handleButtonClick = () => {
      // Implement your button click logic here
      console.log('Button clicked');
    };
  
    return (
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700 text-md font-bold mr-2"> { label } </label>
        <select
          value = { value }
          onChange={handleDropdownChange}
          className="w-1/2 border border-gray-300 p-2 rounded text-sm text-center"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          onClick = { handleButtonClick }
          disabled={ !isButtonEnabled }
          className = { `ml-4 px-4 py-2 bg-yellow-300 text-white rounded w-1/4 text-sm ${
            isButtonEnabled ? 'hover:bg-yellow-400' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Fetch
        </button>
      </div>
    );
  };
  
export default InputField;