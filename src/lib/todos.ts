import { partition } from "rambda";

const uuid = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export type ITodoItem = {
  id: string;
  content: string;
  completed: boolean;
};

export const IN_MEMORY_STATE = {
  todos: [
    {
      id: uuid(),
      content: "Learn TypeScript",
      completed: true,
    },
    {
      id: uuid(),
      content: "Learn Bun",
      completed: false,
    },
    {
      id: uuid(),
      content: "Learn Elysia",
      completed: false,
    },
    {
      id: uuid(),
      content: "Learn HTMX",
      completed: false,
    },
  ] as ITodoItem[],
};

export function addTodo(
  content: string,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE
) {
  const newTodo = {
    id: uuid(),
    content,
    completed: false,
  };
  state.todos.push(newTodo);
  return newTodo;
}

export function toggleTodo(
  id: string,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE
) {
  const todo = state.todos.find((todo) => todo.id === id);
  if (!todo) {
    throw new Error(`Todo with id ${id} not found!`);
  }
  todo.completed = !todo.completed;
  return todo;
}

export function removeTodo(
  id: string,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE
) {
  const index = state.todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    state.todos.splice(index, 1);
  }
  return index;
}

export function clearCompletedTodos(
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE
) {
  const [completedTodos, pendingTodos] = partition(
    (todo) => todo.completed,
    state.todos
  );

  for (const todo of completedTodos) {
    removeTodo(todo.id, state);
  }

  return pendingTodos;
}

export function toggleAllTodos(
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE
) {
  const allTodosCompleted = state.todos.every((todo) => todo.completed);

  for (const todo of state.todos) {
    todo.completed = !allTodosCompleted;
  }

  return state.todos;
}

export function getTodos(
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE
): ITodoItem[] {
  return state.todos;
}

export function getTodosByCompleted(
  completed: boolean,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE
): ITodoItem[] {
  return state.todos.filter((todo) => todo.completed === completed);
}
