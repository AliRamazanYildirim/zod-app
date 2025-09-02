"use client";

import { useState } from "react";
import { createTodoSchema, CreateTodo } from "@/lib/schemas";
import { ZodError } from "zod";
import { Plus } from "lucide-react";

interface AddTodoFormProps {
  onAdd: (todo: CreateTodo) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate using Zod schema
      const validatedData = createTodoSchema.parse({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
      });

      onAdd(validatedData);

      // Reset form
      setTitle("");
      setDescription("");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Neues Todo hinzufügen
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titel *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-700 text-black ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Was möchten Sie erledigen?"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Beschreibung
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-700 text-black ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Zusätzliche Details (optional)"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={20} className="mr-2" />
          {isSubmitting ? "Hinzufügen..." : "Todo hinzufügen"}
        </button>
      </div>
    </form>
  );
}
