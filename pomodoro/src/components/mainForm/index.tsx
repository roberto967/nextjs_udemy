import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import styles from './styles.module.css';

export function MainForm() {
  return (
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
  );
}
