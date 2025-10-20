import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initiaTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionsTypes } from './taskActions';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((event: MessageEvent<number>) => {
    const secondsLeft = event.data;

    console.log(secondsLeft);

    if (secondsLeft <= 0) {
      dispatch({
        type: TaskActionsTypes.COMPLETE_TASK,
      });
      console.log('WORKER MORTO');
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining: secondsLeft },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      console.log('matou o worker, sem tarefa');
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state, worker]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
