import { NextRequest, NextResponse } from "next/server";
import { todoService } from "@/lib/todoService";
import { createTodoSchema } from "@/lib/schemas";
import { ZodError } from "zod";

export async function GET() {
  try {
    const todos = todoService.getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler beim Laden der Todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body using Zod
    const validatedData = createTodoSchema.parse(body);

    const newTodo = todoService.createTodo(validatedData);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validierungsfehler", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Fehler beim Erstellen des Todos" },
      { status: 500 }
    );
  }
}
