import React from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import RippleBox from "daler-ripple-box";

import Icon from "common/icon";
import COLORS from "common/constants/colors";
import animationInput from "./animated-input";
import styles from "./styles.module.scss";

const AnimatedInput: React.FC<animationInput.props> = ({
  status = "default",
  value,
  setValue,
  type = "text",
  hidden = false,
  placeholder,
  errorText,
  onVisibilityToggle = () => {},
}) => {
  // constants
  const inputType = hidden ? "password" : "text";

  // handlers
  const handleToogleVisibility = () => {
    onVisibilityToggle();
  };

  return (
    <div className={styles.animatedInput}>
      <div className={classNames(styles.wrap, styles[status])}>
        <input
          autoComplete="false"
          value={value}
          type={inputType}
          placeholder=" "
          autoCapitalize="off"
          className={classNames(
            styles.input,
            type === "password" && styles.withVisibilityButton
          )}
          onChange={(event) =>
            status !== "pending" && setValue(event.target.value)
          }
        />
        {placeholder && (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        {type === "password" && (
          <RippleBox rippleColor={COLORS.ripple}>
            {(ref) => (
              <div onClick={handleToogleVisibility} className={styles.eye}>
                <div className={styles.iconWrap} ref={ref}>
                  <Icon
                    name={hidden ? "visibility" : "visibilityOff"}
                    className={styles.icon}
                  />
                </div>
              </div>
            )}
          </RippleBox>
        )}
      </div>
      <CSSTransition
        in={status === "error" && !!errorText}
        unmountOnExit
        timeout={120}
        classNames={{
          enter: styles.errorBoxEnter,
          enterActive: styles.errorBoxEnterActive,
          exit: styles.errorBoxExit,
          exitActive: styles.errorBoxExitActive,
        }}
      >
        <div className={styles.errorBox}>
          <div className={styles.errorBox__text}>{errorText}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default AnimatedInput;
