import { NextRequest, NextResponse } from "next/server";
import { todoService } from "@/lib/todoService";
import { updateTodoSchema } from "@/lib/schemas";
import { ZodError } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todo = todoService.getTodoById(id);

    if (!todo) {
      return NextResponse.json(
        { error: "Todo nicht gefunden" },
        { status: 404 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler beim Laden des Todos" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate the request body using Zod
    const validatedData = updateTodoSchema.parse(body);

    const updatedTodo = todoService.updateTodo(id, validatedData);

    if (!updatedTodo) {
      return NextResponse.json(
        { error: "Todo nicht gefunden" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validierungsfehler", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Fehler beim Aktualisieren des Todos" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = todoService.deleteTodo(id);

    if (!success) {
      return NextResponse.json(
        { error: "Todo nicht gefunden" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Todo erfolgreich gelöscht" });
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler beim Löschen des Todos" },
      { status: 500 }
    );
  }
}
