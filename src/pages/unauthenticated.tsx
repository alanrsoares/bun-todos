import * as elements from "typed-html";

import tw, { FC } from "~/lib/tw";
import { SignInButton, SignUpButton } from "~/ui/auth";
import { Card, Divider } from "~/ui/components";

const Container = tw.div`flex-1 flex items-center justify-center`;

const UnauthenticatedPage: FC = () => {
  return (
    <Container>
      <Card class="mx-auto w-full max-w-sm" frosted>
        <Card.Body class="space-y-4">
          <Card.Title>Welcome to Bun ToDos!</Card.Title>
          <div>
            <SignInButton length="block" />
            <Divider>or</Divider>
            <SignUpButton length="block" />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UnauthenticatedPage;
