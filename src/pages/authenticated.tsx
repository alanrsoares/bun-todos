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
      <Card class="mx-auto w-min" frosted>
        <Card.Body class="space-y-4">
          <Card.Title>{`${user?.firstName}'s ToDos`}</Card.Title>
          <div hx-get="/todos" hx-swap="outerHtml" hx-trigger="load" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthenticatedPage;
