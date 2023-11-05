import React, { JSX, useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PeopleService from '../API/PeopleService';
import Modal from './Modal';

const PersonInfo = () => {
  const [person, setPerson] = useState<Person>();

  const { id } = useParams();

  const [fetchPersonInfo, isPersonInfoLoading, isPersonInfoError] = useFetching(async (id) => {
    const response = await PeopleService.getPersonById(id);
    setPerson(response.data);
  });

  useEffect(() => {
    fetchPersonInfo(id);
  }, []);

  const [modalActive, setModalActive] = useState(true);

  const layout = (content: JSX) => (
    <Modal active={modalActive} setActive={setModalActive}>
      <div
        style={{
          border: '1px solid',
          padding: '100px',
          color: 'black',
        }}
      >
        {content}
      </div>
    </Modal>
  );

  if (isPersonInfoLoading) {
    return layout(<h1>Loading...</h1>);
  }

  if (isPersonInfoError) {
    return layout(<h1>Error </h1>);
  }

  return layout(
    <>
      <div>{person?.name}</div>
      <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="luke" />
    </>
  );
};

export default PersonInfo;
