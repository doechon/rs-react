import './App.css';
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import PersonInfo from './components/PersonInfo';
import { Person } from './types/Person';
import { useFetching } from './hooks/useFetching';
import PeopleService from './API/PeopleService';

const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [fetchPeople, isPeopleLoading, isPeopleError] = useFetching(async (url, error = false) => {
    let response;
    url = url[0];
    if (error) {
      response = await PeopleService.getError();
    } else if (url.length === 0) {
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
    if (isPeopleError.length === 0) {
      fetchPeople('', true);
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
        <Route path={'people/:id'} element={<PersonInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
