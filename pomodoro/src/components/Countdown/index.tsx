import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './styles.module.css';

// <a/> depois vai ser link do router

export function CountDown() {
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
