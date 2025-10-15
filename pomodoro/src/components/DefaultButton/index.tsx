import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode;
  collor?: 'green' | 'red';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DefaultButton({
  icon,
  collor = 'green',
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[collor]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
