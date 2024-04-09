import { useState } from 'react';
import { useSelector } from 'react-redux';

import Input from '../../../components/Input';
import Label from '../../../components/Label';
import Alert from '../../../components/Alert';

function TaskItem({ task, onTaskItemToggle, className, isSelected = false, ...props }) {
  const [finished, setFinished] = useState(task.finished);

  const onClick = (ev) => {
    ev.stopPropagation();

    setFinished(!finished);
    onTaskItemToggle({
      ...task,
      finished: !finished
    });
  };

  return (
    <div
      className={
        'border bg-white p-4 shadow-md' +
        (className ? ` ${className}` : '') +
        (isSelected ? `  border-blue-400 !bg-blue-300` : ' cursor-pointer hover:bg-blue-100')
      }
      {...props}
    >
      <div className="flex flex-row items-center gap-2">
        <Label>
          <Input type="checkbox" name="finished" defaultChecked={finished} onClick={onClick} />
        </Label>
        <div className={'grow' + (task.finished ? ' line-through' : '')}>{task.label}</div>
      </div>
    </div>
  );
}

function TasksList({
  selectedTask,
  onTaskItemSelect,
  onItemDoubleClick,
  onTaskItemToggle,
  className,
  type = 'unfinished',
  ...props
}) {
  const tasks = useSelector((state) => state.tasks[type].data);
  const loadError = useSelector((state) => state.tasks[type].error);

  let taskEls = [];

  if (!loadError) {
    if (tasks && tasks.length > 0) {
      taskEls = tasks.map((task) => {
        return (
          <TaskItem
            key={task.app_task_id}
            task={{ ...task }}
            className="cursor-pointer select-none rounded-md"
            isSelected={selectedTask?.app_task_id === task.app_task_id}
            onDoubleClick={() => onItemDoubleClick(task)}
            onClick={() => onTaskItemSelect(task)}
            onTaskItemToggle={onTaskItemToggle}
          />
        );
      });
    } else if (type === 'unfinished') {
      taskEls = <p className="text-xs italic tracking-wider">Pridėkite pirmąją užduotį</p>;
    }
  } else {
    taskEls = <Alert type="error">{loadError}</Alert>;
  }

  return (
    <div className={className} {...props}>
      {taskEls}
    </div>
  );
}

export default TasksList;
