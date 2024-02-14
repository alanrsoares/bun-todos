import * as elements from "typed-html";
import Card from "~/ui/Card";

export default function HomePage() {
  return (
    <div class="flex-1 flex items-center justify-center">
      <Card class="bg-base-200 w-min mx-auto">
        <Card.Body class="space-y-4">
          <div hx-get="/todos" hx-swap="outerHtml" hx-trigger="load" />
        </Card.Body>
      </Card>
    </div>
  );
}
