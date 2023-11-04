import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PeopleService from '../API/PeopleService';

const PersonInfo = () => {
  const [person, setPerson] = useState<Person>();

  const { id } = useParams();

  useEffect(() => {
    fetchPersonInfo(id);
  }, []);

  const [fetchPersonInfo, isPersonInfoLoading, isPersonInfoError] = useFetching(async (id) => {
    const response = await PeopleService.getPersonById(id);
    setPerson(response.data);
  });

  if (isPersonInfoLoading) {
    return <h1>Loading...</h1>;
  }

  if (isPersonInfoError) {
    return <h1>Error </h1>;
  }

  return (
    <>
      <div>{person?.name}</div>
      <img src="" alt="luke" />
    </>
  );
};

export default PersonInfo;
