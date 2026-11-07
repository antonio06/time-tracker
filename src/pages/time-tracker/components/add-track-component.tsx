import React from 'react';
import './add-track.css';

interface Props {
  onAddTrack: (taskName: string) => void;
}

export const AddTrackComponent: React.FC<Props> = ({ onAddTrack }) => {
  const [taskName, setTaskName] = React.useState('');

  const onTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }

  const onAddTrackClick = () => {
    onAddTrack(taskName);
    setTaskName('');
  }
  return (
    <div className="container">
      <input placeholder="Enter task name" type="text" name="taskName" value={taskName} onChange={onTaskNameChange} />
      <button className="button" onClick={onAddTrackClick}>Add Track</button>
    </div>
  )
}
