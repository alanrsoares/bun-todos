const uuid = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export type ITodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

export const IN_MEMORY_STATE = {
  todos: [
    {
      id: uuid(),
      title: "Learn TypeScript",
      completed: true,
    },
    {
      id: uuid(),
      title: "Learn React",
      completed: false,
    },
    {
      id: uuid(),
      title: "Learn Next.js",
      completed: false,
    },
  ] as ITodoItem[],
};

export function addTodo(
  title: string,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE,
) {
  const newTodo = {
    id: uuid(),
    title,
    completed: false,
  };
  state.todos.push(newTodo);
  return newTodo;
}

export function toggleTodo(
  id: string,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE,
) {
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return todo;
}

export function removeTodo(
  id: string,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE,
) {
  const index = state.todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    state.todos.splice(index, 1);
  }
  return index;
}

export function clearCompletedTodos(
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE,
) {
  const completedTodos = state.todos.filter((todo) => todo.completed);
  completedTodos.forEach((todo) => removeTodo(todo.id, state));
  return completedTodos;
}

export function toggleAllTodos(
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE,
) {
  const allTodosCompleted = state.todos.every((todo) => todo.completed);
  state.todos.forEach((todo) => (todo.completed = !allTodosCompleted));
  return state.todos;
}

export function getTodos(
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE,
): ITodoItem[] {
  return state.todos;
}

export function getTodosByCompleted(
  completed: boolean,
  state: typeof IN_MEMORY_STATE = IN_MEMORY_STATE,
): ITodoItem[] {
  return state.todos.filter((todo) => todo.completed === completed);
}
