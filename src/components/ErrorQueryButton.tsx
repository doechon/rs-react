import React, { Component } from 'react';

class ErrorQueryButton extends Component<
  { handleClick: React.MouseEventHandler; error: string },
  NonNullable<unknown>
> {
  render() {
    const text = this.props.error ? 'Revert Error' : 'Error';

    return <button onClick={this.props.handleClick}>{text}</button>;
  }
}

export default ErrorQueryButton;
