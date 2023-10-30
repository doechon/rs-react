import './App.css';
import React from 'react';
import { API_ERROR, API_PEOPLE, API_SEARCH } from './constants/api';
import { getApiResource } from './utils/network';
import PeopleList from './components/PeopleList';
import ErrorQueryButton from './components/ErrorQueryButton';
import Search from './components/Search';
import withPersistence from './components/withPersistence';

class App extends React.Component<NonNullable<unknown>, NonNullable<unknown>> {
  state = {
    people: [],
    loading: true,
    error: '',
  };

  setupApiPeopleConnection(searchQuery = '') {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    if (this.state.error) {
      this.setState({ error: '' });
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
          this.setState({ people: response.results });
        },
        (err) => {
          this.setState({ error: err });
        }
      )
      .finally(() => this.setState({ loading: false }));
  }

  componentDidMount() {
    this.setupApiPeopleConnection(API_SEARCH + localStorage.getItem('searchQuery') || '');
  }

  handleErrorBtnClick() {
    if (!this.state.error) {
      this.setupApiPeopleConnection(API_ERROR);
    } else {
      this.setupApiPeopleConnection(API_SEARCH + localStorage.getItem('searchQuery') || '');
    }
  }

  handleSearchBtnClick(updatedSearchQuery: string) {
    this.setupApiPeopleConnection(API_SEARCH + updatedSearchQuery);
  }

  render() {
    const { people, error, loading } = this.state;
    const LocalStorageSearch = withPersistence('searchQuery', localStorage)(Search);

    return (
      <>
        <h1>People from SWAPI</h1>
        <div>
          <h2>Search</h2>
          <p>Enter smth to find people with correspond names, or empty query to get all people</p>
          {/*type for hoc is pain*/}
          {/*https://react-typescript-cheatsheet.netlify.app/docs/hoc/react_hoc_docs*/}
          <LocalStorageSearch handleClickProp={this.handleSearchBtnClick.bind(this)} />
          <h2>Test error</h2>
          <ErrorQueryButton handleClick={this.handleErrorBtnClick.bind(this)} error={error} />
        </div>
        <div>
          <h2>List</h2>
          <PeopleList loading={loading} people={people} error={error} />
        </div>
      </>
    );
  }
}

export default App;
