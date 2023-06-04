import { css } from "@emotion/css";
import classNames from "classnames";

import text from "./text";

const COLORS = {
  "n-0": "#222730",
  "n-1": "#2e3440",
  "n-2": "#3b4252",
  "n-3": "#434c5e",
  "n-4": "#4c566a",
  "n-5": "#66728a",
  "n-6": "#8993a5",
  "n-7": "#a9b0bd",
  "n-8": "#ffffff",
  "n-9": "#eceff4",
  "n-10": "#e5e9f0",
  "n-11": "#d8dee9",
};

const Text = ({
  size = 1,
  color = "n-1",
  weight = 400,
  align = "left",
  lineHeight,
  children,
  className,
}: text.props) => {
  const style = css`
    font-size: ${size}rem;
    color: ${COLORS[color]};
    font-weight: ${weight};
    text-align: ${align};
    line-height: ${lineHeight ? lineHeight + "rem" : "auto"};
  `;
  return <div className={classNames(className, style)}>{children}</div>;
};

export default Text;
