import { Todo, CreateTodo, UpdateTodo } from "./schemas";

// In-memory storage for todos (in a real app, you would use a database)
let todos: Todo[] = [];

// Generate a simple UUID
function generateId(): string {
  return crypto.randomUUID();
}

export const todoService = {
  // Get all todos
  getTodos(): Todo[] {
    return todos;
  },

  // Get todo by id
  getTodoById(id: string): Todo | undefined {
    return todos.find((todo) => todo.id === id);
  },

  // Create new todo
  createTodo(data: CreateTodo): Todo {
    const newTodo: Todo = {
      id: generateId(),
      title: data.title,
      description: data.description,
      completed: data.completed || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todos.push(newTodo);
    return newTodo;
  },

  // Update todo
  updateTodo(id: string, data: UpdateTodo): Todo | null {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    todos[todoIndex] = {
      ...todos[todoIndex],
      ...data,
      updatedAt: new Date(),
    };

    return todos[todoIndex];
  },

  // Delete todo
  deleteTodo(id: string): boolean {
    const initialLength = todos.length;
    todos = todos.filter((todo) => todo.id !== id);
    return todos.length < initialLength;
  },

  // Toggle todo completion
  toggleTodo(id: string): Todo | null {
    const todo = this.getTodoById(id);

    if (!todo) {
      return null;
    }

    return this.updateTodo(id, { completed: !todo.completed });
  },
};
