// https://dev.to/camilomejia/fetch-data-with-react-hooks-and-typescript-390c
import React from 'react';
import { Person } from '../types/Person';

class PeopleList extends React.Component<
  { people: Person[]; loading: boolean; error: string },
  NonNullable<unknown>
> {
  render() {
    const { error, people, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error || !people) {
      return <div>Error: {error}</div>;
    }

    if (people.length === 0) {
      return <div>No such people with given name</div>;
    }

    return (
      <>
        {people.map((person) => (
          <div key={person.name}>{person.name}</div>
        ))}
      </>
    );
  }
}

export default PeopleList;
