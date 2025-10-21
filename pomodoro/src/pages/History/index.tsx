import { ArrowDown, ArrowUp, LucideArrowDownUp, TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import style from './style.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskSatus';
import { sortTasks, type SortTaskOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { toast } from 'react-toastify';
import { showMessage } from '../../adapters/showMessage';
import { usePageTitle } from '../../hooks/usePageTitle';

export function History() {
  const { state, dispatch } = useTaskContext();

  const [sortTasksOptions, setSortTasksOptions] = useState<SortTaskOptions>(
    () => {
      const initialField = 'startDate';
      const initialDirection = 'desc';

      return {
        tasks: sortTasks({
          tasks: state.tasks,
          field: initialField,
          direction: initialDirection,
        }),
        field: initialField,
        direction: initialDirection,
      };
    },
  );

  const hasTasksInHistory = state.tasks.length > 0;

  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        field: prevState.field,
        direction: prevState.direction,
      }),
    }));
  }, [state.tasks]);

  usePageTitle('Histórico');

  function handleSortTasks({ field }: Pick<SortTaskOptions, 'field'>) {
    if (state.tasks.length <= 1) return;

    let newDirection: 'asc' | 'desc';

    if (field === sortTasksOptions.field) {
      newDirection = sortTasksOptions.direction === 'asc' ? 'desc' : 'asc';
    } else {
      newDirection = 'desc';
    }

    setSortTasksOptions({
      tasks: sortTasks({
        tasks: state.tasks,
        field,
        direction: newDirection,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleClearHistory() {
    toast.dismiss();
    showMessage.confirm('Tem certeza?', confirmation => {
      if (confirmation) {
        dispatch({ type: TaskActionsTypes.RESET_STATE });
      }
    });
    // if (!confirm('Tem certeza que deseja limpar o histórico?')) return;

    // dispatch({ type: TaskActionsTypes.RESET_STATE });
  }

  function setArrowIcon(field: SortTaskOptions['field']) {
    if (sortTasksOptions.field !== field || state.tasks.length <= 1)
      return <LucideArrowDownUp className={style['arrow-icon']} />;

    return sortTasksOptions.direction === 'asc' ? (
      <ArrowDown className={style['arrow-icon']} />
    ) : (
      <ArrowUp className={style['arrow-icon']} />
    );
  }

  return (
    <MainTemplate>
      <Container>
        <Container>
          <Heading>
            <span>Histórico</span>
            <span className={style['button-container']}>
              <DefaultButton
                icon={<TrashIcon />}
                aria-label='Limpar histórico'
                title='Apagar histórico'
                onClick={handleClearHistory}
                disabled={!hasTasksInHistory || state.activeTask !== null}
                color={
                  !hasTasksInHistory || state.activeTask !== null
                    ? 'disabled'
                    : 'red'
                }
              />
            </span>
          </Heading>
        </Container>

        <Container>
          {hasTasksInHistory && (
            <div className={style['responsive-table']}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSortTasks({ field: 'name' })}
                      className={style.thSort}
                    >
                      Tarefa {setArrowIcon('name')}
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: 'duration' })}
                      className={style.thSort}
                    >
                      Duração {setArrowIcon('duration')}
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: 'startDate' })}
                      className={style.thSort}
                    >
                      Data {setArrowIcon('startDate')}
                    </th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTasksOptions.tasks.map(task => {
                    const taskTypeDic = {
                      workTime: 'Foco',
                      shortBreakTime: 'Pausa Curta',
                      longBreakTime: 'Pausa Longa',
                    };

                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration} minutos</td>
                        <td>{formatDate(new Date(task.startDate))}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskTypeDic[task.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!hasTasksInHistory && (
            <p style={{ textAlign: 'center' }}>Nenhuma tarefa no histórico.</p>
          )}
        </Container>
      </Container>
    </MainTemplate>
  );
}
