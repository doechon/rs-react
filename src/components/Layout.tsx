import React from 'react';
import withPersistence from './withPersistence';
import Search from './Search';
import ErrorQueryButton from './ErrorQueryButton';
import PeopleList from './PeopleList';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const Layout = ({
  handleSearchBtnClick,
  isPeopleLoading,
  people,
  isPeopleError,
  handleErrorBtnClick,
}: {
  handleSearchBtnClick;
  isPeopleLoading;
  people;
  isPeopleError;
  handleErrorBtnClick;
}) => {
  const LocalStorageSearch = withPersistence('searchQuery', localStorage)(Search);

  return (
    <>
      <h1>People from SWAPI</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <div>
            <h2>Search</h2>
            <p>Enter smth to find people with correspond names, or empty query to get all people</p>
            <LocalStorageSearch handleClickProp={handleSearchBtnClick} />
          </div>
          <div>
            <h2>List</h2>
            <ErrorBoundary>
              <PeopleList loading={isPeopleLoading} people={people} error={isPeopleError} />
            </ErrorBoundary>
          </div>
          <h2>Test error</h2>
          <ErrorQueryButton handleClick={handleErrorBtnClick} error={isPeopleError} />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
