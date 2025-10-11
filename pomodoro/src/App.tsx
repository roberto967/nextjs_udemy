import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';

export function App() {
  return (
    <>
      <Heading>
        <span>Título do App</span>
        <TimerIcon />
      </Heading>

      <p>Texto qualquer</p>
    </>
  );
}
