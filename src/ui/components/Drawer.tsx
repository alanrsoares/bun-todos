import tw from "~/lib/tw";

const StyledDrawer = tw.div`drawer`;

export const Drawer = Object.assign(StyledDrawer, {
  Content: tw.div`drawer-content`,
  Side: tw.div`drawer-side`,
  Overlay: tw.label`drawer-overlay`,
});
