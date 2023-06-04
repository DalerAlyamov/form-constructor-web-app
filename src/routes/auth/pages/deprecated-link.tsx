import React from "react";
import RippleBox from "daler-ripple-box";
import { useSearchParams } from "react-router-dom";

import Loading from "common/components/loading";
import Text from "common/ui/text";
import COLORS from "common/constants/colors";
import styles from "../styles.module.scss";
import auth from "../auth";

const DeprecatedLink = ({ setAuthPage }: auth.deprecatedLinkProps) => {
  /* HOOKS */
  const [, setSearchParams] = useSearchParams();

  /* HANDLES */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({});
    setAuthPage("login");
  };

  return (
    <div className={styles.container}>
      {/* LOADING BOX */}
      <div className={styles.loading}>
        <Loading error />
      </div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {/* DESCRIPTION */}
        <Text size={1.7} color="n-10" align="center" lineHeight={1.5}>
          Эта ссылка устарела
        </Text>
        {/* BACK_TO_LOGIN BUTTON */}
        <RippleBox rippleColor={COLORS.ripple}>
          {(ref, contentRef) => (
            <button ref={ref} type="submit" className={styles.outlinedButton}>
              <span ref={contentRef}>Ко входу</span>
            </button>
          )}
        </RippleBox>
      </form>
    </div>
  );
};

export default DeprecatedLink;
