import tw from "~/lib/tw";

const Card = tw.div.cva("card", {
  variants: {
    compact: {
      true: "card-compact",
    },
  },
});

export default Object.assign(Card, {
  Title: tw.div`card-title`,
  Body: tw.div`card-body`,
  Actions: tw.div`card-actions`,
});
