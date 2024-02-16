import tw, { ComponentProps } from "~/lib/tw";

const Card = tw.div.cva("card", {
  variants: {
    compact: {
      true: "card-compact",
    },
    responsive: {
      true: "card-compact sm:card-normal",
    },
  },
});

export default Object.assign(Card, {
  Title: tw.h2`card-title`,
  Body: tw.div`card-body`,
  Actions: tw.div`card-actions`,
});

export type CardProps = ComponentProps<typeof Card>;
