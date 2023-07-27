import * as elements from "typed-html";

export default function HomePage() {
  return (
    <div class="flex-1 flex items-center justify-center">
      <section class="card bg-base-200 w-min mx-auto">
        <div class="card-body">
          <h2 class="card-title">What needs to be done?</h2>

          <form class="flex gap-2" onsubmit="return false">
            <input
              type="text"
              name="title"
              placeholder="What needs to be done?"
              class="input input-bordered"
            />
            <button type="submit" class="btn btn-primary">
              Add
            </button>
          </form>

          <div hx-get="/todos" hx-swap="outerHtml" hx-trigger="load" />
        </div>
      </section>
    </div>
  );
}
