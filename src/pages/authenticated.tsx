import type { User } from "@clerk/backend";
import * as elements from "typed-html";

import tw, { FC } from "~/lib/tw";
import { Card } from "~/ui/components";

const Container = tw.div`flex-1 flex items-center justify-center`;

type AuthenticatedPageProps = {
  user?: User;
};

const AuthenticatedPage: FC<AuthenticatedPageProps> = ({ user }) => {
  return (
    <Container>
      <Card class="mx-auto w-full max-w-sm" frosted responsive>
        <Card.Body class="space-y-4">
          <Card.Title>{`${user?.firstName}'s ToDos`}</Card.Title>
          <div
            hx-get="/todos"
            hx-swap="outerHtml"
            hx-trigger="load"
            class="w-full"
          >
            <div class="flex items-center gap-2">
              <div id="loading" class="loading loading-spinner" /> loading
              todos...
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthenticatedPage;
