import styles from './styles.module.css';

type DefaultInputProps = {
  id: string;
  LabelText: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({
  id,
  type,
  LabelText,
  ...rest
}: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{LabelText}</label>
      <input type={type} id={id} {...rest} />
    </>
  );
}
