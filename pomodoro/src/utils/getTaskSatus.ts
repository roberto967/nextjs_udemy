import type { TaskModel } from '../models/TaskModel';

export function getTaskStatus(
  task: TaskModel,
  activeTask: TaskModel | null,
): string {
  if (task.completeDate) {
    return 'Concluído';
  }
  if (task.interruptDate) {
    return 'Interrompido';
  }
  if (task.id === activeTask?.id) {
    return 'Em andamento';
  }
  return 'Abandonada';
}
