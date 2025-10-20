import styles from './styles.module.css';

type DefaultInputProps = {
  id: string;
  LabelText: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({
  id,
  type,
  LabelText,
  ...props
}: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{LabelText}</label>
      <input
        className={styles.input}
        type={type}
        id={id}
        {...props}
        autoComplete='off'
      />
    </>
  );
}
