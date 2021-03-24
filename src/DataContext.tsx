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

import {Event} from './types';

type State = {
  events?: Event[] | null;
  isLoading: boolean;
};

type Action =
  | {type: 'RESTORE_EVENTS'; events?: Event[] | null}
  | {type: 'UPDATE_EVENTS'; events: Event[] | null};

type Context = {
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (key: string) => void;
  state: State;
};

export const DataContext = createContext<Context>({
  addEvent: (_: Event) => console.warn('no provider'),
  updateEvent: (_: Event) => console.warn('no provider'),
  deleteEvent: (_: string) => console.warn('no provider'),
  state: {isLoading: false},
});

type Props = {
  children: ReactNode;
};

const DataProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        case 'RESTORE_EVENTS':
          return {
            ...prevState,
            events: action.events,
            isLoading: false,
          };
        case 'UPDATE_EVENTS':
          return {
            ...prevState,
            events: action.events,
          };
      }
    },
    {
      isLoading: true,
      events: null,
    },
  );
  const context = useMemo(
    () => ({
      addEvent: (event: Event) => {
        const events = [...(state.events || []), event];
        AsyncStorage.setItem('@county_events', JSON.stringify(events))
          .then(() => dispatch({type: 'UPDATE_EVENTS', events}))
          .catch(() => {
            console.error('AsyncStorage: ');
          });
      },
      deleteEvent: (key: string) => {
        const events = [...(state.events || [])];
        const indexToDelete = events.findIndex((event) => event.key === key);
        if (indexToDelete > -1) {
          events.splice(indexToDelete, 1);
          AsyncStorage.setItem('@county_events', JSON.stringify(events))
            .then(() => dispatch({type: 'UPDATE_EVENTS', events: events}))
            .catch(() => {
              console.error('AsyncStorage: ');
            });
        }
      },
      updateEvent: (event: Event) => {
        const events = [...(state.events || [])];
        const indexToUpdate = events.findIndex(
          (singleEvent) => singleEvent.key === event.key,
        );
        if (indexToUpdate > -1) {
          events[indexToUpdate] = event;
          AsyncStorage.setItem('@county_events', JSON.stringify(events))
            .then(() => dispatch({type: 'UPDATE_EVENTS', events: events}))
            .catch(() => {
              console.error('AsyncStorage: ');
            });
        }
      },
    }),
    [state],
  );

  useEffect(() => {
    const restoreEvents = async () => {
      //await AsyncStorage.clear();
      try {
        const events = await AsyncStorage.getItem('@county_events');
        if (events) {
          dispatch({type: 'RESTORE_EVENTS', events: JSON.parse(events)});
        }
      } catch {
        console.error('AsyncStorage: ');
      }
    };

    restoreEvents();
  }, []);
  return (
    <DataContext.Provider value={{...context, state}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => useContext(DataContext);
