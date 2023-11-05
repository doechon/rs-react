import React, { useState } from 'react';

export interface SearchProps {
  handleClickProp?: (value: string) => null;
  children?: React.ReactNode;
}

const Search = ({ handleClickProp }: SearchProps) => {
  const [inputValue, setInputValue] = useState(localStorage.getItem('searchQuery') || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const saveValue = (value: string) => {
    localStorage.setItem('searchQuery', value);
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
