import React from "react";
import classNames from "classnames";
import RippleBox from "daler-ripple-box";
import { CSSTransition } from "react-transition-group";

import AnimatedInput from "common/components/animated-input";
import Loading from "common/components/loading";
import Text from "common/ui/text";
import Flex from "common/ui/flex";
import services from "../api";
import styles from "../styles.module.scss";
import auth from "../auth";

const ResetPassword = ({ code, setAuthPage }: auth.resetPasswordProps) => {
  /* FORM STATES */
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  /* LOGIC STATES */
  const [pending, setPending] = React.useState(false);
  const [loadingPending, setLoadingPending] = React.useState(false);
  const [passwordHidden, setPasswordHidden] = React.useState(true);
  const [passwordError, setPasswordError] = React.useState<string>();
  const [successReset, setSuccessReset] = React.useState(false);

  /* CONSTANTS */
  const FORM_NOT_VALID =
    password.trim() === "" || passwordConfirm.trim() === "";

  /* REFS */
  const containerRef = React.useRef<HTMLDivElement>(null);

  /* HANDLES */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm)
      return setPasswordError("Новый пароль не может совпадать со старым");
    if (FORM_NOT_VALID) return;
    document.body?.scroll(0, 0);
    const activeElement = document.activeElement as HTMLElement;
    activeElement.blur();
    setPending(true);
    setLoadingPending(true);
    setPasswordError(undefined);
    setTimeout(async () => {
      const response = await services.resetPassword({
        code,
        password,
      });
      setLoadingPending(false);
      if (typeof response === "string") {
        setPending(false);
        setAuthPage("deprecated-link");
      } else if (response) {
        activeElement.focus();
        setAuthPage("successfully-reset-password");
        setSuccessReset(true);
      } else setPending(false);
    }, 1000);
  };

  /* EFFECTS */
  React.useEffect(() => {
    setPasswordError(undefined);
  }, [password, passwordConfirm]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* LOADING BOX */}
      <div className={styles.loading}>
        <Loading animated={loadingPending} accept={successReset} />
      </div>
      {/* FORM */}
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {/* TITLE */}
        <Text size={1.5} color="n-10">
          {pending ? "Сброс пароля..." : "Введите новый пароль"}
        </Text>
        {/* PASSWORD & PASSWORD_CONFIRM */}
        <Flex
          gap={20}
          direction="column"
          align="stretch"
          width="100%"
          className={styles.flex1}
        >
          {/* PASSWORD */}
          <AnimatedInput
            value={password}
            setValue={setPassword}
            type="password"
            placeholder={passwordError ?? "Пароль"}
            status={pending ? "pending" : passwordError ? "error" : "default"}
            hidden={pending || passwordHidden}
            onVisibilityToggle={() => setPasswordHidden(!passwordHidden)}
          />
          {/* PASSWORD_CONFIRM */}
          <AnimatedInput
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            placeholder={"Повторите пароль"}
            status={pending ? "pending" : passwordError ? "error" : "default"}
            hidden={pending || passwordHidden}
          />
        </Flex>
        {/* SAVE BUTTON */}
        <CSSTransition
          unmountOnExit
          in={!FORM_NOT_VALID}
          timeout={100}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exit,
            exitActive: styles.exitActive,
          }}
        >
          <RippleBox>
            {(ref, contentRef) => (
              <button
                ref={ref}
                type="submit"
                className={classNames(
                  styles.containedButton,
                  pending && styles.disabled
                )}
              >
                <span ref={contentRef}>Сохранить</span>
              </button>
            )}
          </RippleBox>
        </CSSTransition>
      </form>
    </div>
  );
};

export default ResetPassword;
