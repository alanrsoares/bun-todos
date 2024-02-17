import * as elements from "typed-html";

import { Button, Input } from "./components";

export default function TodoForm() {
  return (
    <form
      class="flex gap-2"
      hx-post="/todos"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <Input
        type="text"
        name="content"
        placeholder="What needs to be done?"
        bordered
        class="input-sm md:input-md"
      />
      <Button type="submit" variant="primary" class="btn-sm md:btn-md">
        Add
      </Button>
    </form>
  );
}
