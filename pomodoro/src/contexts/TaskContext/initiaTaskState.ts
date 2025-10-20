import type { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 0.04, // in minutes
    shortBreakTime: 0.04, // in minutes
    longBreakTime: 15, // in minutes
  },
};
