import { z } from "zod";

// Todo Schema
export const todoSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, "Titel ist erforderlich")
    .max(100, "Titel darf maximal 100 Zeichen haben"),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Schema for creating a new todo (without id, createdAt, updatedAt)
export const createTodoSchema = todoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a todo
export const updateTodoSchema = todoSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types derived from schemas
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodo = z.infer<typeof createTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
