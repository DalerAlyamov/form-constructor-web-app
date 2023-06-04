import classNames from "classnames";

import styles from "./styles.module.scss";

const Loading = ({
  animated,
  accept,
  error,
}: {
  animated?: boolean;
  error?: boolean;
  accept?: boolean;
  size?: number;
}) => (
  <div
    className={classNames(
      styles.loading,
      accept && styles.accept,
      error && styles.error,
      animated && styles.animated
    )}
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loading;
