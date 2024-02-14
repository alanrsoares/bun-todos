import * as elements from "typed-html";
import tw from "~/lib/tw";
import Card from "~/ui/Card";

const Container = tw.div`flex-1 flex items-center justify-center`;

export default function HomePage() {
  return (
    <Container>
      <Card class="bg-base-200 w-min mx-auto">
        <Card.Body class="space-y-4">
          <div hx-get="/todos" hx-swap="outerHtml" hx-trigger="load" />
        </Card.Body>
      </Card>
    </Container>
  );
}
