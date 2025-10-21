import type { TaskModel } from '../models/TaskModel';

export type SortTaskOptions = {
  tasks: TaskModel[];
  direction?: 'asc' | 'desc';
  field?: keyof TaskModel; // campo para ordenar, padrão é 'startDate'
};

export function sortTasks({
  field = 'startDate',
  direction = 'desc',
  tasks = [],
}: SortTaskOptions) {
  return [...tasks].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // == Valores nulos ==

    // Se os dois forem nulos
    if (aValue == null && bValue == null) return 0;

    // Se apenas aValue for nulo
    if (aValue == null) return 1;
    // Se apenas bValue for nulo
    if (bValue == null) return -1;

    // --- COMPARAÇÃO NUMÉRICA ---

    // Se os dois valores forem números, fazemos uma subtração para ordenar
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc'
        ? aValue - bValue // Ex: 1, 2, 3...
        : bValue - aValue; // Ex: 3, 2, 1...
    }

    // --- COMPARAÇÃO STRING ---

    // Se os dois valores forem textos, usamos localeCompare para comparar em ordem alfabética
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue) // A -> Z
        : bValue.localeCompare(aValue); // Z -> A
    }

    // --- CASOS NÃO TRATADOS ---

    // Se não for nem número, nem string, nem null, não alteramos a ordem
    return 0;
  });
}
