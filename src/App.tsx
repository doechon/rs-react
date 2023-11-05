import './App.css';
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import PersonInfo from './components/PersonInfo';
import { Person } from './types/Person';
import { useFetching } from './hooks/useFetching';
import PeopleService from './API/PeopleService';

const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [fetchPeople, isPeopleLoading, isPeopleError] = useFetching(async (url, error = false) => {
    const page = searchParams.get('page');
    let response;
    url = url[0];
    if (error) {
      response = await PeopleService.getError();
    } else if (page) {
      response = await PeopleService.getAllByPage(page);
    } else if (url.length === 0) {
      response = await PeopleService.getAll();
    } else {
      response = await PeopleService.getAllWithSearch(url);
    }
    setPeople(response.data.results);
  });

  useEffect(() => {
    fetchPeople(localStorage.getItem('searchQuery') || '');
  }, [searchParams]);

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
            page={searchParams.get('page')}
            setPage={setSearchParams}
          />
        }
      >
        <Route path={'people/:id'} element={<PersonInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
