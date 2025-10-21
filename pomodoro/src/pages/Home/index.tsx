import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { CountDown } from '../../components/Countdown';
import { MainForm } from '../../components/mainForm';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function Home() {
  const { state } = useTaskContext();

  useEffect(() => {
    document.title = `Início ${state.activeTask ? '- ' + state.formattedSecondsRemaining : ''}`;
  }, [state]);

  return (
    <MainTemplate>
      <Container>
        <Container>
          <CountDown />
        </Container>

        <Container>
          <MainForm />
        </Container>
      </Container>
    </MainTemplate>
  );
}
