// import { Heading } from './components/Heading';
import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/Countdown';

import './styles/theme.css';
import './styles/global.css';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <form action='#'>
        <div className='formRow'>
          <DefaultInput
            id='meuInput1'
            type='text'
            LabelText='Task'
            placeholder='digite algo'
          />
        </div>

        <div className='formRow'>
          <Cycles />
        </div>
      </form>
    </>
  );
}
