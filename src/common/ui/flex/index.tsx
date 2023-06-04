import { css } from "@emotion/css";
import classNames from "classnames";

import flex from "./flex";

const Flex = ({
  width,
  justify = "flex-start",
  align = "flex-start",
  direction = "row",
  gap = 0,
  wrap = false,
  children,
  className,
}: flex.props) => {
  const style = css`
    display: flex;
    gap: ${gap}px;
    width: ${typeof width === "string" ? width : width ? width + "px" : "initial"};
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
    flex-wrap: ${wrap ? "wrap" : "nowrap"};
  `;
  return <div className={classNames(className, style)}>{children}</div>;
};

export default Flex;
