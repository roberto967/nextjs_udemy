import { Container } from '../../components/Container';
import { CountDown } from '../../components/Countdown';
import { MainForm } from '../../components/mainForm';
import { MainTemplate } from '../../templates/MainTemplate';
import { usePageTitle } from '../../hooks/usePageTitle';

export function Home() {
  usePageTitle('Início');

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
