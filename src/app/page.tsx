"use client";

import { useState, useEffect } from "react";
import { Todo, CreateTodo } from "@/lib/schemas";
import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";
import { CheckSquare } from "lucide-react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData: CreateTodo) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fehler beim Erstellen des Todos");
      }

      const newTodo = await response.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    }
  };

  const handleUpdateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Fehler beim Aktualisieren des Todos"
        );
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fehler beim Löschen des Todos");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckSquare size={48} className="text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Todo App</h1>
          </div>
          <p className="text-gray-600">
            Organisieren Sie Ihre Aufgaben mit Zod-Validierung
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Fehler:</p>
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Schließen
            </button>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {/* Add Todo Form */}
          <div className="lg:col-span-1">
            <AddTodoForm onAdd={handleAddTodo} />
          </div>

          {/* Todo List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
