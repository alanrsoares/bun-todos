import tw, { ComponentProps } from "~/lib/tw";

export const Input = tw.input.cva("input", {
  variants: {
    variant: {
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
      info: "input-info",
    },
    inputSize: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    },
    ghost: {
      true: "input-ghost",
    },
    bordered: {
      true: "input-bordered",
    },
    disabled: {
      true: "input-disabled",
    },
  },
});

export type InputProps = ComponentProps<typeof Input>;
