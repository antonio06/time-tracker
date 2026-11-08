import React from 'react';
import classes from './add-track.module.css';

interface Props {
  onAddTask: (taskName: string) => void;
}

export const AddTrackComponent: React.FC<Props> = ({ onAddTask: onAddTrack }) => {
  const [taskName, setTaskName] = React.useState('');

  const onAddTaskClick = () => {
    onAddTrack(taskName);
    setTaskName('');
  }
  return (
    <div className={classes.addTrack}>
      <button className={classes.addTrackButton} onClick={onAddTaskClick}>Add Task</button>
      <button className={classes.generateExcelButton} onClick={() => console.log('Pending to implement a function')}>Generate excel</button>
    </div>
  )
}
