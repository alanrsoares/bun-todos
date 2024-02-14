import * as elements from "typed-html";
import { Button, Input } from "./core";

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
      />
      <Button type="submit" variant="primary">
        Add
      </Button>
    </form>
  );
}
