import type { User } from "@clerk/backend";
import * as elements from "typed-html";

import tw, { FC } from "~/lib/tw";
import Card from "~/ui/Card";
import { Button } from "~/ui/core";

const Container = tw.div`flex-1 flex items-center justify-center`;

type AuthenticatedPageProps = {
  user?: User;
};

const AuthenticatedPage: FC<AuthenticatedPageProps> = ({ user }) => {
  return (
    <Container>
      <Card class="mx-auto w-min bg-base-200" responsive>
        <Card.Body class="space-y-4">
          <Card.Title>Welcome, {user?.firstName}</Card.Title>
          <div hx-get="/todos" hx-swap="outerHtml" hx-trigger="load" />
          <Card.Actions>
            <Button
              length="block"
              variant="secondary"
              _={`on click
              window.Clerk.signOut() 
              window.location.reload()`}
            >
              Sign Out
            </Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthenticatedPage;
