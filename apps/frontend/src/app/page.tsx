"use client";

import { useState } from "react";
import TaskList from "@/components/tasks/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      key: 1,
      taskName: "Faire les courses",
      date: "2025-03-12",
      isRepeating: false,
      repeatFrequency: "",
      emoji: "🛒",
      isCompleted: false,
    },
    {
      id: 2,
      key: 2,
      taskName: "Coder un projet React",
      date: "2025-03-13",
      isRepeating: true,
      repeatFrequency: "weekly",
      emoji: "💻",
      isCompleted: false,
    },
    {
      id: 3,
      key: 3,
      taskName: "Aller à la salle de sport",
      date: "2025-03-14",
      isRepeating: true,
      repeatFrequency: "daily",
      emoji: "🏋️",
      isCompleted: true,
    },
  ]);

  const onToggleComplete = (taskId: number, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: completed } : task
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold mb-6">Mes Tâches</h1>
      <TaskList tasks={tasks} onToggleComplete={onToggleComplete} />
    </div>
  );
}
