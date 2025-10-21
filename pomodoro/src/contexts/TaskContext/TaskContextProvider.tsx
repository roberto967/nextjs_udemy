import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initiaTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionsTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState,
    initialState => {
      const storedState = localStorage.getItem('pomodoroStateV1');

      if (!storedState) {
        return initialState;
      }

      const parsedState = JSON.parse(storedState) as TaskStateModel;

      return {
        ...parsedState,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        activeTask: null,
      };
    },
  );

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((event: MessageEvent<number>) => {
    const secondsLeft = event.data;

    if (secondsLeft <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionsTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining: secondsLeft },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('pomodoroStateV1', JSON.stringify(state));

    if (!state.activeTask) {
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
