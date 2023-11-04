import React, { Component } from 'react';
import Search from './Search';

function withPersistence(storageKey: string, storage: Storage) {
  return function (WrappedComponent: typeof Search) {
    return class PersistentComponent extends Component<NonNullable<unknown>, NonNullable<unknown>> {
      render() {
        return <WrappedComponent saveValue={this.saveValue} {...this.props} />;
      }

      saveValue(value: string) {
        storage.setItem(storageKey, value);
      }
    };
  };
}

export default withPersistence;
