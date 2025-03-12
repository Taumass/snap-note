import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  taskName: string;
  date: string;
  isRepeating: boolean;
  repeatFrequency: string;
  emoji: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  return (
    <div className="flex flex-col w-full h-full">
      {tasks.map((task) => (
        <TaskItem
          id={task.id}
          key={task.id}
          taskName={task.taskName}
          date={task.date}
          isRepeating={task.isRepeating}
          repeatFrequency={task.repeatFrequency}
          emoji={task.emoji}
          isCompleted={task.isCompleted}
          onToggleComplete={() => onToggleComplete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
