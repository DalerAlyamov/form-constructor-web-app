import React from "react";
import RippleBox from "daler-ripple-box";

import Loading from "common/components/loading";
import Text from "common/ui/text";
import COLORS from "common/constants/colors";
import styles from "../styles.module.scss";
import auth from "../auth";

const SuccessfullySentLink = ({
  setAuthPage,
}: auth.successfullySentLinkProps) => {
  /* HANDLES */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthPage("login");
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
          Я отправил вам на почту ссылку для восстановления пароля
        </Text>
        {/* BACK_TO_LOGIN BUTTON */}
        <RippleBox rippleColor={COLORS.ripple}>
          {(ref, contentRef) => (
            <button ref={ref} type="submit" className={styles.outlinedButton}>
              <span ref={contentRef}>Назад ко входу</span>
            </button>
          )}
        </RippleBox>
      </form>
    </div>
  );
};

export default SuccessfullySentLink;
