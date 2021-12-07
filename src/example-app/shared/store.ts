import { createStore, combineReducers } from 'redux'
import { StoreCreator } from '../../framework/types';

export interface Action {
    type: string,
    payload?: any,
}

export interface ExampleAction extends Action {
    type: 'shared/exampleAction1',
    payload: string,
};

export type ServerState = Readonly<{
    exampleData2: string
}>;

const defaultServer: ServerState = {
    exampleData2: undefined,
};

const server = (state: ServerState = defaultServer, action: Action): ServerState => {
    return state;
};

export type SharedState = Readonly<{
    exampleData1: string,
}>;

const defaultShared: SharedState = {
    exampleData1: undefined,
}

const shared = (state: SharedState = defaultShared, action: Action): SharedState => {
    switch (action.type) {
        case 'shared/exampleAction1':
          return { ...state, exampleData1: action.payload };
        default:
          return state
      }
};

export type CombinedState = {
    server: ServerState,
    shared: SharedState,
}

export const sharedStoreCreator: StoreCreator<SharedState, Action> = () => createStore(shared);

export const combinedStoreCreator: StoreCreator<CombinedState, Action> = () => createStore(combineReducers({
    server,
    shared,
}));

