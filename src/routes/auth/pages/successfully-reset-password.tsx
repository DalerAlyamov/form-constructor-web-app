import React from "react";
import RippleBox from "daler-ripple-box";

import Loading from "common/components/loading";
import Text from "common/ui/text";
import styles from "../styles.module.scss";
import auth from "../auth";
import { useSearchParams } from "react-router-dom";

const SuccessfullyResetPassword = ({
  setAuthPage,
}: auth.successfullyResetPasswordProps) => {
  /* HOOKS */
  const [, setSearchParams] = useSearchParams();

  /* HANDLES */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthPage("login");
    setSearchParams({});
  };

  return (
    <div className={styles.container}>
      {/* LOADING BOX */}
      <div className={styles.loading}>
        <Loading accept />
      </div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {/* DESCRIPTION */}
        <Text size={1.25} color="n-10" align="center" lineHeight={1.5}>
          Ваш новый пароль успешно сохранён
        </Text>
        {/* BACK_TO_LOGIN BUTTON */}
        <RippleBox>
          {(ref, contentRef) => (
            <button ref={ref} type="submit" className={styles.containedButton}>
              <span ref={contentRef}>Войти</span>
            </button>
          )}
        </RippleBox>
      </form>
    </div>
  );
};

export default SuccessfullyResetPassword;
