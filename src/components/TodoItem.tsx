"use client";

import { useState } from "react";
import { Todo } from "@/lib/schemas";
import { Trash2, Edit3, Check, X } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow-sm ${
        todo.completed ? "bg-gray-50" : "bg-white"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Todo-Titel"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Beschreibung (optional)"
            rows={2}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Check size={16} className="mr-1" />
              Speichern
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <X size={16} className="mr-1" />
              Abbrechen
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleComplete}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p
                    className={`text-sm mt-1 ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Erstellt:{" "}
                  {new Date(todo.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-500 hover:text-blue-500"
                disabled={todo.completed}
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
