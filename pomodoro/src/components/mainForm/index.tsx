import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextTypeCycle } from '../../utils/getNextTypeCycle';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

import styles from './styles.module.css';

export function MainForm() {
  const { state, dispatch } = useTaskContext();

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const taskNameInputRef = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextTypeCycle = getNextTypeCycle(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (!taskNameInputRef.current) throw new Error('input ref is null');

    const taskName = taskNameInputRef.current.value.trim();

    if (!taskName) {
      showMessage.warning('Informe o nome da tarefa antes de iniciar.');
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

    dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });
  }

  return (
    <form onSubmit={handleCreateNewTask} action='#'>
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
          defaultValue={lastTaskName}
        />
      </div>

      <div className='formRow'>
        <Tips />
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
            onClick={() =>
              dispatch({
                type: TaskActionsTypes.INTERRUPT_TASK,
              })
            }
            key={'stopButton'}
          />
        )}
      </div>
    </form>
  );
}
