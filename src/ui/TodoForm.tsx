import * as elements from "typed-html";

import { Button, Input } from "./components";

export default function TodoForm() {
  return (
    <form
      class="flex gap-2 md:gap-3"
      hx-post="/todos"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <Input
        type="text"
        name="content"
        placeholder="What needs to be done?"
        class="input-sm flex-1 md:input-md"
        $bordered
        x-init="$el.focus()"
      />
      <Button
        type="submit"
        $variant="primary"
        class="btn-sm md:btn-md"
        disabled="true"
      >
        Add
      </Button>
    </form>
  );
}
