import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextTypeCycle } from '../../utils/getNextTypeCycle';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleDescriptionMap = {
    workTime: 'Foco',
    shortBreakTime: 'Pausa curta',
    longBreakTime: 'Pausa longa',
  };

  const cycleStep = Array.from({ length: state.currentCycle });
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextTypeCycle(nextCycle);

          return (
            <span
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label='Indicador de ciclo de foco'
              title={cycleDescriptionMap[nextCycleType]}
              key={`${nextCycleType}_${nextCycle}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
