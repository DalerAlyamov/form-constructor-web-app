import ui from "common/ui/ui";

declare namespace text {
  interface props extends ui.props {
    size?: number;
    children?: React.ReactNode;
    className?: string;
    color?:
      | "n-0"
      | "n-1"
      | "n-2"
      | "n-3"
      | "n-4"
      | "n-5"
      | "n-6"
      | "n-7"
      | "n-8"
      | "n-9"
      | "n-10"
      | "n-11";
    weight?: 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    lineHeight?: number;
    align?: "left" | "center" | "right";
  }
}

export default text;
