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
import { useState } from 'react';

export function History() {
  const { state } = useTaskContext();

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

  function handleSortTasks({ field }: Pick<SortTaskOptions, 'field'>) {
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

  function setArrowIcon(field: SortTaskOptions['field']) {
    if (sortTasksOptions.field !== field)
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
                color='red'
                aria-label='Limpar histórico'
                title='Apagar histórico'
              />
            </span>
          </Heading>
        </Container>

        <Container>
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
                <tr>
                  <td>Estudar React</td>
                  <td>25 minutos</td>
                  <td>01/01/2023 08:00</td>
                  <td>Concluído</td>
                  <td>Estudo</td>
                </tr>
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
        </Container>
      </Container>
    </MainTemplate>
  );
}
