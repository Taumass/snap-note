import React from "react";
import TaskList from "./TaskList";

// Props:
// taskName: nom de la tâche
// date: date de la tâche (string)
// isRepeating: booléen indiquant si la tâche se répète
// repeatFrequency: fréquence de répétition (quotidienne, hebdomadaire, etc.)
// emoji: emoji représentant la tâche
// isCompleted: état de la tâche (cochée ou non)
// onToggleComplete: fonction appelée quand on coche/décoche la tâche

type TaskItemProps = {
  id: number;
  taskName: string;
  date: string;
  isRepeating: boolean;
  repeatFrequency: string;
  emoji: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
};

const TaskItem = ({
  id,
  taskName = "Nom de la tâche",
  date = "12 mars 2025",
  isRepeating = true,
  repeatFrequency = "hebdomadaire",
  emoji = "🚀",
  isCompleted = false,
  onToggleComplete,
}: TaskItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
      {/* Checkbox */}
      <div className="flex-shrink-0 mr-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onToggleComplete}
          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
      </div>

      {/* Contenu principal */}
      <div className="flex-grow">
        {/* Nom de la tâche */}
        <div
          className={`font-medium text-lg ${isCompleted ? "text-gray-400 line-through" : "text-gray-800"}`}>
          {taskName}
        </div>

        {/* Date et répétition */}
        <div className="flex items-center mt-1 text-sm text-gray-500">
          {/* Date */}
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{date}</span>
          </div>

          {/* Répétition - conditionnellement rendu */}
          {isRepeating && (
            <div className="flex items-center ml-4">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Répétition {repeatFrequency}</span>
            </div>
          )}
        </div>
      </div>

      {/* Emoji de la tâche */}
      <div className="flex-shrink-0 ml-4 text-2xl">{emoji}</div>
    </div>
  );
};

export default TaskItem;
