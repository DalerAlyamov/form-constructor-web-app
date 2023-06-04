import React from "react";
import classNames from "classnames";
import RippleBox from "daler-ripple-box";

import AnimatedInput from "common/components/animated-input";
import Loading from "common/components/loading";
import Flex from "common/ui/flex";
import Text from "common/ui/text";
import COLORS from "common/constants/colors";
import services from "../api";
import styles from "../styles.module.scss";
import auth from "../auth";

const CheckMail = ({ setAuthPage }: auth.checkMailProps) => {
  /* FORM STATES */
  const [mail, setMail] = React.useState("");

  /* LOGIC STATES */
  const [successChecking, setSuccessChecking] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [loadingPending, setLoadingPending] = React.useState(false);
  const [emailError, setMailError] = React.useState<string>();

  /* CONSTANTS */
  const FORM_NOT_VALID = mail.trim() === "";

  /* HANDLES */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (FORM_NOT_VALID) return;
    const activeElement = document.activeElement as HTMLElement;
    activeElement.blur();
    setPending(true);
    setLoadingPending(true);
    setMailError(undefined);
    setTimeout(async () => {
      const response = await services.sendResetpassLink({
        mail,
      });
      setLoadingPending(false);
      if (typeof response === "string") {
        setPending(false);
        setMailError(response);
      } else if (response) {
        setSuccessChecking(true);
        setAuthPage("successfully-sent-link");
      } else {
        setPending(false);
      }
    }, 1000);
  };

  /* EFFECTS */
  React.useEffect(() => setMailError(undefined), [mail]);

  return (
    <div className={styles.container}>
      {/* LOADING BOX */}
      <div className={styles.loading}>
        <Loading animated={loadingPending} accept={successChecking} />
      </div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {/* TITLE */}
        <Text size={1.5} color="n-10">
          {pending ? "Проверка..." : "Перезапись пароля"}
        </Text>
        {/* DESCRIPTION */}
        <Text size={1} color="n-6" align="center" lineHeight={1.5}>
          Для этого потребуется почта, с который вы регистрировались
        </Text>
        {/* EMAIL */}
        <AnimatedInput
          value={mail}
          setValue={setMail}
          placeholder={emailError ?? "Почта"}
          status={pending ? "pending" : emailError ? "error" : "default"}
        />
        {/* CONTINUE & BACK_TO_LOGIN BUTTON */}
        <Flex gap={16} direction="column" width="100%">
          {/* CONTINUE BUTTON */}
          {!FORM_NOT_VALID && (
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
                  <span ref={contentRef}>Далее</span>
                </button>
              )}
            </RippleBox>
          )}
          {/* BACK_TO_LOGIN BUTTON */}
          <RippleBox rippleColor={COLORS.ripple}>
            {(ref, contentRef) => (
              <button
                ref={ref}
                className={classNames(styles.altTextButton)}
                onClick={() => setAuthPage("login")}
              >
                <span ref={contentRef}>Назад ко входу</span>
              </button>
            )}
          </RippleBox>
        </Flex>
      </form>
    </div>
  );
};

export default CheckMail;
