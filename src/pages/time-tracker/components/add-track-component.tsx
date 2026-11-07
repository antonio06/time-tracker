import React from 'react';
import './add-track.css';

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
    <div className="add-track">
      <button className="button" onClick={onAddTaskClick}>Add Task</button>
    </div>
  )
}
