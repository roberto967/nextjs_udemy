import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextTypeCycle } from '../../utils/getNextTypeCycle';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextTypeCycle = getNextTypeCycle(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} minutos!</span>,
    shortBreakTime: <span>Aproveite seu descanso curto!</span>,
    longBreakTime: <span>Aproveite seu descanso longo!</span>,
  };

  const tipsForNonActiveTask = {
    workTime: (
      <span>O próximo ciclo será de {state.config.workTime} minutos</span>
    ),
    shortBreakTime: (
      <span>O próximo ciclo será de {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: <span>Proximo descanso será longo</span>,
  };

  return (
    <>
      {state.activeTask
        ? tipsForWhenActiveTask[state.activeTask.type]
        : tipsForNonActiveTask[nextTypeCycle]}
    </>
  );
}
