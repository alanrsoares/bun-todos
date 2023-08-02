import * as elements from "typed-html";

export default function HomePage() {
  return (
    <div class="flex-1 flex items-center justify-center">
      <section class="card bg-base-200 w-min mx-auto">
        <div class="card-body space-y-4">
          <div hx-get="/todos" hx-swap="outerHtml" hx-trigger="load" />
        </div>
      </section>
    </div>
  );
}
