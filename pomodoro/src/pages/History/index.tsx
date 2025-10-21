import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import style from './style.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';

export function History() {
  const { state } = useTaskContext();

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
                  <th>Tarefa</th>
                  <th>Duração</th>
                  <th>Data</th>
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
                {state.tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration} minutos</td>
                    <td>{formatDate(new Date(task.startDate))}</td>
                    <td>
                      {task.completeDate
                        ? 'Concluído'
                        : task.interruptDate
                          ? 'Interrompido'
                          : 'Em andamento'}
                    </td>
                    <td>{task.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Container>
    </MainTemplate>
  );
}
