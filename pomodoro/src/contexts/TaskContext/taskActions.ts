import type { TaskModel } from '../../models/TaskModel';

export const enum TaskActionsTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  UPDATE_CONFIG = 'UPDATE_CONFIG',
}

export type TaskActionModel =
  | {
      type: TaskActionsTypes.START_TASK;
      payload: TaskModel;
    }
  | { type: TaskActionsTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
  | {
      type: TaskActionsTypes.INTERRUPT_TASK;
      // payload: { taskId: string };
    }
  | {
      type: TaskActionsTypes.COMPLETE_TASK;
      // payload: { taskId: string };
    }
  | {
      type: TaskActionsTypes.RESET_STATE;
    }
  | {
      type: TaskActionsTypes.UPDATE_CONFIG;
      payload: {
        workTime: number;
        shortBreakTime: number;
        longBreakTime: number;
      };
    };
