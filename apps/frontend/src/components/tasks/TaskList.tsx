import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  key: number;
  taskName: string;
  date: string;
  isRepeating: boolean;
  repeatFrequency: string;
  emoji: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number, isCompleted: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          id={task.id}
          key={task.key}
          taskName={task.taskName}
          date={task.date}
          isRepeating={task.isRepeating}
          repeatFrequency={task.repeatFrequency}
          emoji={task.emoji}
          isCompleted={task.isCompleted}
          onToggleComplete={() => onToggleComplete(task.id, task.isCompleted)}
        />
      ))}
    </div>
  );
};

export default TaskList;
