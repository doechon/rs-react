import React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import PeopleList from './PeopleList';
import { BrowserRouter } from 'react-router-dom';

describe('PEOPLE LIST TESTS', () => {
  let response;
  beforeEach(() => {
    response = {
      data: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        { name: 'C-3PO', url: 'https://swapi.dev/api/people/2/' },
      ],
    };
  });
  test('renders people list', async () => {
    render(
      <BrowserRouter>
        <PeopleList people={response.data} loading={false} error={''} />
      </BrowserRouter>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
