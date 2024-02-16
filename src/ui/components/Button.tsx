import tw, { ComponentProps } from "~/lib/tw";

export const Button = tw.button.cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      success: "btn-success",
      danger: "btn-danger",
      warning: "btn-warning",
      info: "btn-info",
      neutral: "btn-neutral",
      ghost: "btn-ghost",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
    length: {
      wide: "btn-wide",
      block: "btn-block",
    },
    shape: {
      circle: "btn-circle",
      square: "btn-square",
    },
    link: {
      true: "btn-link",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonProps = ComponentProps<typeof Button>;
