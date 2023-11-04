import './App.css';
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import PersonInfo from './components/PersonInfo';
import { Person } from './types/Person';
import { useFetching } from './hooks/useFetching';
import { API_ERROR } from './constants/api';
import PeopleService from './API/PeopleService';
import Modal from './components/Modal';

const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [modalActive, setModalActive] = useState(true);

  const [fetchPeople, isPeopleLoading, isPeopleError] = useFetching(async (url) => {
    let response;
    if (url) {
      response = await PeopleService.getAll();
    } else {
      response = await PeopleService.getAllWithSearch(url);
    }
    setPeople(response.data.results);
  });

  useEffect(() => {
    fetchPeople(localStorage.getItem('searchQuery') || '');
  }, []);

  function handleErrorBtnClick() {
    if (!isPeopleError) {
      fetchPeople(API_ERROR);
    } else {
      fetchPeople(localStorage.getItem('searchQuery') || '');
    }
  }

  function handleSearchBtnClick(updatedSearchQuery: string) {
    fetchPeople(updatedSearchQuery);
  }

  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <Layout
            handleErrorBtnClick={handleErrorBtnClick}
            handleSearchBtnClick={handleSearchBtnClick}
            isPeopleError={isPeopleError}
            isPeopleLoading={isPeopleLoading}
            people={people}
          />
        }
      >
        <Route
          path={'people/:id'}
          element={
            <Modal active={modalActive} setActive={setModalActive}>
              <div
                style={{
                  border: '1px solid',
                  padding: '100px',
                  color: 'black',
                }}
              >
                <PersonInfo />
              </div>
            </Modal>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
