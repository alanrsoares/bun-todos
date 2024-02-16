import { compose } from "rambda";

import tw, { ComponentProps } from "~/lib/tw";

const StyledMenu = tw.ul.cva("menu", {
  variants: {
    direction: {
      vertical: "menu-vertical",
      horizontal: "menu-horizontal",
    },
    size: {
      normal: "menu-normal",
      compact: "menu-compact",
    },
    rounded: {
      true: "rounded-box",
    },
  },
});

const StyledMenuItem = compose(
  tw.li.cva("menu-item", {
    variants: {
      active: {
        true: "active",
      },
      bordered: {
        true: "bordered",
        hover: "hover-bordered",
      },
      disabled: {
        true: "disabled",
      },
    },
  }),
);

export const Menu = Object.assign(StyledMenu, {
  Title: tw.h2`menu-item menu-title`,
  Body: tw.div`menu-body`,
  Actions: tw.div`menu-actions`,
});

export type MenuProps = ComponentProps<typeof StyledMenu>;

export const Mneu = Object.assign(StyledMenuItem, {
  Item: StyledMenuItem,
  Title: tw.li`menu-item menu-title`,
});
