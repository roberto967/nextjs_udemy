import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextTypeCycle } from '../../utils/getNextTypeCycle';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

import styles from './styles.module.css';

export function MainForm() {
  const { state, setState } = useTaskContext();

  const taskNameInputRef = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextTypeCycle = getNextTypeCycle(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInputRef.current) throw new Error('input ref is null');

    const taskName = taskNameInputRef.current.value.trim();

    if (!taskName) {
      alert('Please enter a task name.');
      return;
    }

    const newTask: TaskModel = {
      id: String(new Date().getTime()),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextTypeCycle],
      type: nextTypeCycle,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
        activeTaskId: newTask.id,
      };
    });
  }

  function handleInterruptCurrentTask() {
    setState(prevState => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && task.id === prevState.activeTask.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} action='#'>
      <h1>num: {taskNameInputRef.current?.value}</h1>
      <div className='formRow'>
        <DefaultInput
          id='meuInput1'
          type='text'
          LabelText='Task'
          placeholder='digite algo'
          list='task-suggestions'
          ref={taskNameInputRef}
          required
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>Próximo ciclo será de {state.config[nextTypeCycle]} minutos</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            type='submit'
            title='Iniciar nova tarefa'
            aria-label='Iniciar nova tarefa'
            icon={<PlayCircleIcon />}
            key={'submitButton'}
          />
        ) : (
          <DefaultButton
            type='button'
            title='Interromper tarefa atual'
            aria-label='Interromper tarefa atual'
            icon={<StopCircleIcon />}
            color='red'
            onClick={handleInterruptCurrentTask}
            key={'stopButton'}
          />
        )}
      </div>
    </form>
  );
}
