import React from 'react';
import classes from './actions.module.css';

interface Props {
  onAddTask: (taskName: string) => void;
  onGenerateExcelFile: () => void;
  onSaveDashboard: () => void;
}

export const ActionsComponent: React.FC<Props> = ({ onAddTask, onGenerateExcelFile, onSaveDashboard }) => {
  const [taskName, setTaskName] = React.useState('');

  const onAddTaskClick = () => {
    onAddTask(taskName);
    setTaskName('');
  }

  return (
    <div className={classes.actions}>
      <button className={classes.saveDashboardButton} onClick={onSaveDashboard}>Save</button>
      <button className={classes.addTaskButton} onClick={onAddTaskClick}>Add Task</button>
      <button className={classes.generateExcelButton} onClick={onGenerateExcelFile}>Generate excel</button>
    </div>
  )
}
