import React, { Component } from 'react';
import Search from './Search';

function withPersistence(storageKey: string, storage: Storage) {
  return function (WrappedComponent: typeof Search) {
    return class PersistentComponent extends Component<
      NonNullable<unknown>,
      { initialValue: string | null }
    > {
      state = { initialValue: storage.getItem(storageKey) };

      render() {
        return (
          <WrappedComponent
            initialValue={this.state.initialValue}
            saveValue={this.saveValue}
            {...this.props}
          />
        );
      }

      saveValue(value: string) {
        storage.setItem(storageKey, value);
      }
    };
  };
}

export default withPersistence;
