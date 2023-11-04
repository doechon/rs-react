import React from 'react';
import { Person } from '../types/Person';
import { useNavigate } from 'react-router-dom';

const PeopleListItem = ({ person }: { person: Person }) => {
  const navigate = useNavigate();

  const getPersonId = (url) => {
    const data = url.split('/');
    return data[data.length - 2];
  };
  return (
    <div
      onClick={() => navigate(`/people/${getPersonId(person.url)}`)}
      style={{ cursor: 'pointer' }}
    >
      {person.name}
    </div>
  );
};

export default PeopleListItem;
