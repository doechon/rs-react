import { Person } from '../types/Person';
import React from 'react';

const PeopleList = ({
  people,
  loading,
  error,
}: {
  people: Person[];
  loading: boolean;
  error: string;
}) => {
  if (error) {
    throw new Error();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (people.length === 0) {
    return <div>No such people with given name</div>;
  }

  return (
    <>
      {people.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </>
  );
};

export default PeopleList;
