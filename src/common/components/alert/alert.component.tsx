import classes from './alert.module.css';

interface Props {
  message: string;
  isSuccess: boolean;
  isVisible: boolean;
}

export const Alert = ({ message, isSuccess, isVisible }: Props) => {
  if (!isVisible) return null;
  return (<div className={classes.errorContent}>
    <p className={`${classes.message} ${isSuccess ? classes.success : classes.error}`}>{message}</p>
  </div>);
}
