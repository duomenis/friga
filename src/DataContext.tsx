import React, {
  FC,
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Counter} from './types';

type State = {
  counters?: Counter[] | null;
  isLoading: boolean;
};

type Action =
  | {type: 'RESTORE_COUNTERS'; counters?: Counter[] | null}
  | {type: 'UPDATE_COUNTERS'; counters: Counter[] | null};

type Context = {
  addCounter: (counter: Counter) => void;
  deleteCounter: (key: string) => void;
  state: State;
};

export const DataContext = createContext<Context>({
  addCounter: (_: Counter) => console.warn('no provider'),
  deleteCounter: (_: string) => console.warn('no provider'),
  state: {isLoading: false},
});

type Props = {
  children: ReactNode;
};

const DataProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        case 'RESTORE_COUNTERS':
          return {
            ...prevState,
            counters: action.counters,
            isLoading: false,
          };
        case 'UPDATE_COUNTERS':
          return {
            ...prevState,
            counters: action.counters,
          };
      }
    },
    {
      isLoading: true,
      counters: null,
    },
  );
  const context = useMemo(
    () => ({
      addCounter: (counter: Counter) => {
        const counters = [...(state.counters || []), counter];
        AsyncStorage.setItem('@county_counters', JSON.stringify(counters))
          .then(() => dispatch({type: 'UPDATE_COUNTERS', counters}))
          .catch(() => {
            console.error('AsyncStorage: ');
          });
      },
      deleteCounter: (key: string) => {
        const {counters} = state;
        let updatedCounters = [...(counters || [])];
        const indexToDelete = updatedCounters.findIndex(
          (counter) => counter.key === key,
        );
        if (indexToDelete > -1) {
          updatedCounters.splice(indexToDelete, 1);
          AsyncStorage.setItem('@county_counters', JSON.stringify(counters))
            .then(() =>
              dispatch({type: 'UPDATE_COUNTERS', counters: updatedCounters}),
            )
            .catch(() => {
              console.error('AsyncStorage: ');
            });
        }
      },
    }),
    [state],
  );
  useEffect(() => {
    const restoreCounters = async () => {
      //await AsyncStorage.clear();
      try {
        const counters = await AsyncStorage.getItem('@county_counters');
        if (counters) {
          dispatch({type: 'RESTORE_COUNTERS', counters: JSON.parse(counters)});
        }
      } catch {
        console.error('AsyncStorage: ');
      }
    };

    restoreCounters();
  }, []);
  return (
    <DataContext.Provider value={{...context, state}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => useContext(DataContext);
