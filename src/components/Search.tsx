import React from 'react';

export interface SearchProps {
  initialValue: string | null;
  saveValue: (value: string) => void;
  handleClickProp?: (value: string) => null;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => null;
  children?: React.ReactNode;
}

class Search extends React.Component<SearchProps, { inputValue: string }> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { inputValue: this.props.initialValue || '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <input type="text" value={inputValue} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleClick() {
    const { inputValue } = this.state;
    this.props.saveValue(inputValue.trim());
    this.props.handleClickProp?.(inputValue.trim());
  }
}

export default Search;
