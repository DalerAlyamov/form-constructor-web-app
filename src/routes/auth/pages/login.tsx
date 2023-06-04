import React from "react";
import classNames from "classnames";
import RippleBox from "daler-ripple-box";
import { CSSTransition } from "react-transition-group";

import AnimatedInput from "common/components/animated-input";
import Loading from "common/components/loading";
import Text from "common/ui/text";
import Flex from "common/ui/flex";
import Icon from "common/icon";
import COLORS from "common/constants/colors";
import styles from "../styles.module.scss";
import auth from "../auth";
import services from "../api";

let activeElement: HTMLElement;

const Login = ({ setAuthPage, goToApp }: auth.loginProps) => {
  /* FORM STATES */
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");

  /* LOGIC STATES */
  const [pendingLogin, setPendingLogin] = React.useState(false);
  const [pendingRegister, setPendingRegister] = React.useState(false);
  const [passwordHidden, setPasswordHidden] = React.useState(true);
  const [rememberUser, setRememberUser] = React.useState(false);
  const [mailError, setMailError] = React.useState<string>();
  const [passwordError, setPasswordError] = React.useState<string>();

  /* CONSTANTS */
  const FORM_NOT_VALID = password.trim() === "" || mail.trim() === "";
  const PENDING = pendingLogin || pendingRegister;

  /* REFS */
  const containerRef = React.useRef<HTMLDivElement>(null);

  /* FUNCTIONS */
  const beforeSubmit = () => {
    if (FORM_NOT_VALID) return;
    document.body?.scroll(0, 0);
    activeElement = document.activeElement as HTMLElement;
    activeElement.blur();
    setPendingLogin(true);
    setMailError(undefined);
    setPasswordError(undefined);
  };

  /* HANDLES */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    beforeSubmit();
    const body = {
      mail,
      password,
    };
    (async () => {
      try {
        const response = await services.login(body);
        if (response.status === 200) {
          goToApp();
          localStorage.setItem("token", response.payload.token);
          if (rememberUser)
            localStorage.setItem(
              "refresh_token",
              response.payload.refresh_token
            );
        }
        if (response.status === 404) setMailError(response.message);
        if (response.status === 400) setPassword(response.message);
      } finally {
        setPendingLogin(false);
        activeElement.focus();
      }
    })();
  };
  const handleRegisterClick = () => {
    beforeSubmit();
    const body = {
      mail,
      password,
    };
    (async () => {
      try {
        const response = await services.register(body);

        if (response.status === 201) {
          goToApp();
          localStorage.setItem("token", response.payload.token);
          if (rememberUser)
            localStorage.setItem(
              "refresh_token",
              response.payload.refresh_token
            );
        }
        if (response.status === 409) setMailError(response.message);
      } finally {
        setPendingRegister(false);
        activeElement.focus();
      }
    })();
  };

  /* EFFECTS */
  React.useEffect(() => {
    setMailError(undefined);
    setPasswordError(undefined);
  }, [mail, password]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* LOADING BOX */}
      <div className={styles.loading}>
        <Loading animated={PENDING} />
      </div>
      {/* FORM */}
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {/* TITLE */}
        <Text size={1.5} color="n-10">
          {pendingLogin
            ? "Вход..."
            : pendingRegister
            ? "Регистрация..."
            : "Конструктор формы"}
        </Text>
        {/* MAIL & PASSWOD & REMIND_ME_BUTTON BOX */}
        <Flex
          gap={20}
          direction="column"
          align="stretch"
          width="100%"
          className={styles.flex1}
        >
          {/* MAIL */}
          <AnimatedInput
            value={mail}
            setValue={setMail}
            placeholder={mailError ?? "Почта"}
            status={PENDING ? "pending" : mailError ? "error" : "default"}
          />
          {/* PASSWOD */}
          <AnimatedInput
            value={password}
            setValue={setPassword}
            type="password"
            placeholder={passwordError ?? "Пароль"}
            status={PENDING ? "pending" : passwordError ? "error" : "default"}
            hidden={PENDING || passwordHidden}
            onVisibilityToggle={() => setPasswordHidden(!passwordHidden)}
          />
          {/* REMIND_ME_BUTTON */}
          <RippleBox rippleColor={COLORS.ripple}>
            {(ref, contentRef) => (
              <button
                ref={ref}
                type="button"
                className={classNames(
                  styles.rememberUserButton,
                  PENDING && styles.pending,
                  rememberUser && styles.active
                )}
                onClick={() => setRememberUser(!rememberUser)}
              >
                <span ref={contentRef} className={styles.buttonContent}>
                  <Icon
                    name={rememberUser ? "checkbox" : "checkBoxOutlineBlank"}
                    className={styles.checkbox}
                  />
                  Запомнить меня
                </span>
              </button>
            )}
          </RippleBox>
        </Flex>
        {/* LOGIN & REGISTER BUTTONS */}
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
          <Flex
            width="100%"
            gap={16}
            direction="column"
            className={styles.buttonGroup}
          >
            {/* LOGIN BUTTON */}
            <RippleBox>
              {(ref, contentRef) => (
                <button
                  ref={ref}
                  type="submit"
                  className={classNames(
                    styles.containedButton,
                    PENDING && styles.disabled
                  )}
                >
                  <span ref={contentRef}>Войти</span>
                </button>
              )}
            </RippleBox>
            {/* REGISTER BUTTON */}
            <RippleBox rippleColor={COLORS.ripple}>
              {(ref, contentRef) => (
                <button
                  ref={ref}
                  type="button"
                  className={classNames(
                    styles.textButton,
                    PENDING && styles.disabled
                  )}
                  onClick={handleRegisterClick}
                >
                  <span ref={contentRef}>Зарегистрироваться</span>
                </button>
              )}
            </RippleBox>
          </Flex>
        </CSSTransition>
        {/* FORGOT BUTTON */}
        <RippleBox rippleColor={COLORS.ripple}>
          {(ref, contentRef) => (
            <button
              ref={ref}
              type="button"
              className={classNames(
                styles.altTextButton,
                PENDING && styles.pending
              )}
              onClick={() => setAuthPage("check-mail")}
            >
              <span ref={contentRef}>Забыли пароль?</span>
            </button>
          )}
        </RippleBox>
      </form>
    </div>
  );
};

export default Login;
