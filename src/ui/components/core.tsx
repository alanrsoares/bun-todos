import tw, { type PropsWithChildren, type RenderElement } from "~/lib/tw";

export const Clamp = tw.div`container mx-auto w-full`;

export const Divider = tw.div`divider`;

export const FormControl = tw.div`form-control`;

export const Label = Object.assign(tw.label`label`, {
  Text: tw.span`label-text`,
  AltText: tw.span`label-text-alt`,
});

export const Fragment = ({ children }: { children: any }) => children as string;
