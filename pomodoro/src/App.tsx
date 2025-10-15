// import { Heading } from './components/Heading';
import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/Countdown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon } from 'lucide-react';

import './styles/theme.css';
import './styles/global.css';
import { Footer } from './components/Footer';
import { useState } from 'react';

export function App() {
  // const [numero, setNumero] = useState(0);
  // // lazy initial state, faz com que a função seja executada apenas na inicialização do componente
  // const [valor, setValor] = useState(() => {
  //   return 0;
  // });

  // function handleClick() {
  //   setNumero(prevState => prevState + 1);
  //   // setNumero(numero + 1); // se usar assim, o valor não é atualizado na hora, o que acontece é que o react "junta" as duas chamadas e executa apenas a última
  // }

  return (
    <>
      {/* <Container>
        <span>{numero}</span>
        <button onClick={handleClick}>Aumentar</button>
      </Container> */}

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

        <div className='formRow'>
          <DefaultButton id='meuBotao' icon={<PlayCircleIcon />} />
        </div>
      </form>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
