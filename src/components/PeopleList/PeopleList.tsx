import { Person } from '../../types/Person';
import React from 'react';
import PeopleListItem from '../PeopleListItem';

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

  if (!people || people.length === 0) {
    return <div>No such people with given name</div>;
  }

  return (
    <>
      {people.map((person) => (
        <PeopleListItem key={person.name} person={person} />
      ))}
    </>
  );
};

export default PeopleList;
