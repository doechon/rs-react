import './App.css';
import React, { useEffect, useState } from 'react';
import { API_ERROR, API_PEOPLE, API_SEARCH } from './constants/api';
import { getApiResource } from './utils/network';
import PeopleList from './components/PeopleList';
import ErrorQueryButton from './components/ErrorQueryButton';
import Search from './components/Search';
import withPersistence from './components/withPersistence';
import ErrorBoundary from './components/ErrorBoundary';
import { Person } from './types/Person';

const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  function setupApiPeopleConnection(searchQuery = '') {
    if (!loading) {
      setLoading(true);
    }
    if (error) {
      setError('');
    }
    let url;
    if (searchQuery) {
      url = searchQuery;
    } else {
      url = API_PEOPLE;
    }
    getApiResource(url)
      .then(
        (response) => {
          setPeople(response.results);
        },
        (err) => {
          setError(err);
        }
      )
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setupApiPeopleConnection(API_SEARCH + localStorage.getItem('searchQuery') || '');
  }, []);

  function handleErrorBtnClick() {
    if (!error) {
      setupApiPeopleConnection(API_ERROR);
    } else {
      setupApiPeopleConnection(API_SEARCH + localStorage.getItem('searchQuery') || '');
    }
  }
  function handleSearchBtnClick(updatedSearchQuery: string) {
    setupApiPeopleConnection(API_SEARCH + updatedSearchQuery);
  }

  const LocalStorageSearch = withPersistence('searchQuery', localStorage)(Search);

  return (
    <>
      <h1>People from SWAPI</h1>
      <div>
        <h2>Search</h2>
        <p>Enter smth to find people with correspond names, or empty query to get all people</p>
        <LocalStorageSearch handleClickProp={handleSearchBtnClick} />
        <h2>Test error</h2>
        <ErrorQueryButton handleClick={handleErrorBtnClick} error={error} />
      </div>
      <div>
        <h2>List</h2>
        <ErrorBoundary>
          <PeopleList loading={loading} people={people} error={error} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
