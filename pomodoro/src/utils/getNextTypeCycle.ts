import type { TaskModel } from '../models/TaskModel';

export function getNextTypeCycle(currentCycle: number): TaskModel['type'] {
  if (currentCycle === 8) {
    return 'longBreakTime';
  } else if (currentCycle % 2 === 0) {
    return 'shortBreakTime';
  } else {
    return 'workTime';
  }
}
