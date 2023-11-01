import React, { useState } from 'react';

export interface SearchProps {
  initialValue: string | null;
  saveValue: (value: string) => void;
  handleClickProp?: (value: string) => null;
  children?: React.ReactNode;
}

const Search = ({ initialValue, saveValue, handleClickProp }: SearchProps) => {
  const [inputValue, setInputValue] = useState(initialValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    saveValue(inputValue.trim());
    handleClickProp?.(inputValue.trim());
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
