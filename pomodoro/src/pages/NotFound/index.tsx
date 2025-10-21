import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function NotFound() {
  const { state } = useTaskContext();
  useEffect(() => {
    document.title = `404 - Página não encontrada ${state.activeTask ? '- ' + state.formattedSecondsRemaining : ''}`;
  }, [state]);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>404 - Página não encontrada 🚀</Heading>
          <p>
            Opa! Parece que a página que você está tentando acessar não existe.
            Talvez ela tenha tirado férias, resolvido explorar o universo ou se
            perdido em algum lugar entre dois buracos negros. 🌌
          </p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}
