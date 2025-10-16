import { act, useEffect, useReducer, useState } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initiaTaskState';
import { TaskContext } from './TaskContext';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialTaskState);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  type ActionType = {
    type: string;
    payload?: number;
  };

  const [myState, dispatch] = useReducer(
    (state, action: ActionType) => {
      console.log(state, action);

      switch (action.type) {
        case 'INCREMENT':
          return {
            ...state,
            secondsRemaining: state.secondsRemaining + (action.payload || 0),
          };

        case 'DECREMENT':
          return {
            ...state,
            secondsRemaining: state.secondsRemaining - (action.payload || 0),
          };

        default:
          return state;
      }
    },
    {
      secondsRemaining: 0,
    },
  );

  return (
    <TaskContext.Provider value={{ state, setState }}>
      <h1>O estado é {JSON.stringify(myState)}</h1>
      <button
        onClick={() => {
          dispatch({ type: 'INCREMENT', payload: 1 });
        }}
      >
        Incr
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'DECREMENT', payload: 1 });
        }}
      >
        DECREMENT
      </button>
    </TaskContext.Provider>
  );
}
