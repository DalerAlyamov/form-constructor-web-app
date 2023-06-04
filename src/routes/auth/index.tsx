import React, { createRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames";

import ROUTES from "common/constants/routes";
import commonApi from "common/api";
import services from "./api";
import Pages from "./pages";
import styles from "./styles.module.scss";
import auth from "./auth";

const Auth = () => {
  /* HOOKS */
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /* LOGIC_STATES */
  const [page, setPage] = React.useState<auth.page>(null);
  const [fadeOut, setFadeOut] = React.useState(false);

  /* CONSTANTS */
  const RESET_PASS_TOKEN = searchParams.get("reset_password_token");

  /* FUNCTIONS */
  const goToAppFadeAnimation = React.useCallback(() => {
    setFadeOut(true);
    setTimeout(() => navigate(ROUTES.app), 160);
  }, [navigate]);

  /* PAGE_REF_ELEMENTS */
  const pagesItems: auth.pageItem[] = [
    {
      page: "login",
      ref: createRef(),
      element: (
        <Pages.Login setAuthPage={setPage} goToApp={goToAppFadeAnimation} />
      ),
    },
    {
      page: "check-mail",
      ref: createRef(),
      element: <Pages.CheckMail setAuthPage={setPage} />,
    },
    {
      page: "successfully-sent-link",
      ref: createRef(),
      element: <Pages.SuccessfullySentLink setAuthPage={setPage} />,
    },
    {
      page: "deprecated-link",
      ref: createRef(),
      element: <Pages.DeprecatedLink setAuthPage={setPage} />,
    },
    {
      page: "reset-password",
      ref: createRef(),
      element: (
        <Pages.ResetPassword
          setAuthPage={setPage}
          code={RESET_PASS_TOKEN ?? ""}
        />
      ),
    },
    {
      page: "successfully-reset-password",
      ref: createRef(),
      element: <Pages.SuccessfullyResetPassword setAuthPage={setPage} />,
    },
  ];
  const currentPageItem = pagesItems.find((pageItem) => pageItem.page === page);

  /* EFFECTS */
  React.useEffect(() => {
    if (RESET_PASS_TOKEN) {
      (async () => {
        const response = await services.checkResetpassCode({
          code: RESET_PASS_TOKEN,
        });
        if (response) setPage("reset-password");
        else setPage("deprecated-link");
      })();
    } else setPage("login");
  }, [RESET_PASS_TOKEN]);

  React.useEffect(() => {
    (async () => {
      if (await commonApi.checkAuthToken()) navigate(ROUTES.app);
    })();
  }, [navigate]);

  return (
    <SwitchTransition>
      <CSSTransition
        key={page}
        nodeRef={currentPageItem?.ref}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
        timeout={160}
      >
        <div
          ref={currentPageItem?.ref}
          className={classNames(styles.auth, fadeOut && styles.fadeOut)}
        >
          {currentPageItem?.element}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Auth;
