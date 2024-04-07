import tw from "~/lib/tw";

export const Checkbox = tw.input.cva("checkbox", {
  variants: {
    $variant: {
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      accent: "checkbox-accent",
      success: "checkbox-success",
      warning: "checkbox-warning",
      error: "checkbox-error",
      info: "checkbox-info",
    },
    $inputSize: {
      xs: "checkbox-xs",
      sm: "checkbox-sm",
      md: "checkbox-md",
      lg: "checkbox-lg",
    },
  },
});
