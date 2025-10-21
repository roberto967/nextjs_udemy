import { SaveAllIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import style from './styles.module.css';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function Settings() {
  const { state } = useTaskContext();

  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const workTime = workTimeInputRef.current?.value;
    const shortBreakTime = shortBreakTimeInputRef.current?.value;
    const longBreakTime = longBreakTimeInputRef.current?.value;
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
        <Container>
          <p style={{ textAlign: 'center' }}>
            Aqui você pode ajustar suas preferências.
          </p>
        </Container>
      </Container>

      <Container>
        <form action='#' onSubmit={saveSettings} className={style.form}>
          <div className={style.formRow}>
            <DefaultInput
              id='workTime'
              LabelText='Foco'
              ref={workTimeInputRef}
              defaultValue={state.config.workTime}
            />
          </div>
          <div className={style.formRow}>
            <DefaultInput
              id='shortBreakTime'
              LabelText='Pausa Curta'
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className={style.formRow}>
            <DefaultInput
              id='longBreakTime'
              LabelText='Pausa Longa'
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime}
            />
          </div>

          <div className={style.formRow}>
            <DefaultButton
              icon={<SaveAllIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
              type='submit'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
