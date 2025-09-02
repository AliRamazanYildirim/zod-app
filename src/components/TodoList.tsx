"use client";

import { useState } from "react";
import { Todo } from "@/lib/schemas";
import TodoItem from "./TodoItem";
import { Filter, CheckCircle, Circle, List } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

type FilterType = "all" | "active" | "completed";

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Meine Todos</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Circle size={16} className="mr-1" />
            {activeCount} offen
          </span>
          <span className="flex items-center">
            <CheckCircle size={16} className="mr-1" />
            {completedCount} erledigt
          </span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <List size={16} className="mr-1" />
          Alle ({todos.length})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "active"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Circle size={16} className="mr-1" />
          Offen ({activeCount})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <CheckCircle size={16} className="mr-1" />
          Erledigt ({completedCount})
        </button>
      </div>

      {/* Todo Items */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {filter === "all" &&
              "Keine Todos vorhanden. Fügen Sie ein neues Todo hinzu!"}
            {filter === "active" && "Keine offenen Todos. Großartige Arbeit!"}
            {filter === "completed" && "Keine erledigten Todos."}
          </div>
        ) : (
          filteredTodos
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
        )}
      </div>
    </div>
  );
}
