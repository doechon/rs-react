import React from 'react';

const ErrorQueryButton = ({
  handleClick,
  error,
}: {
  handleClick: React.MouseEventHandler;
  error: string;
}) => {
  const text = error ? 'Error already happen' : 'Error';

  return <button onClick={handleClick}>{text}</button>;
};

export default ErrorQueryButton;
