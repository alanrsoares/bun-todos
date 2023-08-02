import * as elements from "typed-html";

export default function TodoForm() {
  return (
    <form
      class="flex gap-2"
      hx-post="/todos"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <input
        type="text"
        name="content"
        placeholder="What needs to be done?"
        class="input input-bordered"
      />
      <button type="submit" class="btn btn-primary">
        Add
      </button>
    </form>
  );
}
