import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';
import { Container } from './components/Container';

export function App() {
  return (
    <>
      <Container>
        <Heading>
          Pomodoro Timer <TimerIcon />
        </Heading>
        <section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit
          amet nisi dignissim, finibus sem sit amet, hendrerit nunc. Nullam
          ornare lacus eget lorem pellentesque, feugiat vulputate risus
          sollicitudin.
        </section>
      </Container>
    </>
  );
}
