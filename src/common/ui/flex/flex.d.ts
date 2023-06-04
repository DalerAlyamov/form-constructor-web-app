import ui from "common/ui/ui";

declare namespace flex {
  interface props extends ui.props {
    width?: string | number;
    direction?: "column" | "row" | "column-reverse" | "row-reverse";
    justify?:
      | "center"
      | "flex-start"
      | "flex-end"
      | "space-between"
      | "space-around"
      | "space-evenly"
      | "stretch";
    align?: "center" | "flex-start" | "flex-end" | "stretch";
    gap?: number;
    wrap?: boolean;
    children?: React.ReactNode;
    className?: string;
  }
}

export default flex;
