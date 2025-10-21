import { useEffect } from 'react';
import { useTaskContext } from '../contexts/TaskContext/useTaskContext';

export function usePageTitle(title: string) {
  const { state } = useTaskContext();

  useEffect(() => {
    document.title = `${title} ${state.activeTask ? ' - ' + state.formattedSecondsRemaining : ''}`;
  }, [state, title]);
}
