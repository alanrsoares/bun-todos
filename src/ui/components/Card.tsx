import tw, { ComponentProps } from "~/lib/tw";

const StyledCard = tw.div.cva("card", {
  variants: {
    compact: {
      true: "card-compact",
    },
    responsive: {
      true: "card-compact sm:card-normal",
    },
  },
});

export const Card = Object.assign(StyledCard, {
  Title: tw.h2`card-title`,
  Body: tw.div`card-body`,
  Actions: tw.div`card-actions`,
});

export type CardProps = ComponentProps<typeof StyledCard>;
