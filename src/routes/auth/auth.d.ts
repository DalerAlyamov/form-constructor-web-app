declare namespace login {
  type page =
    | null
    | "check-mail"
    | "successfully-sent-link"
    | "login"
    | "reset-password"
    | "successfully-reset-password"
    | "deprecated-link";

  interface pageItem {
    page: page;
    ref: React.Ref<HTMLDivElement>;
    element: React.ReactNode;
  }

  /* PAGES PROPS */
  interface checkMailProps {
    setAuthPage: React.Dispatch<React.SetStateAction<page>>;
  }
  interface loginProps {
    setAuthPage: React.Dispatch<React.SetStateAction<page>>;
    goToApp: () => void;
  }
  interface successfullySentLinkProps {
    setAuthPage: React.Dispatch<React.SetStateAction<page>>;
  }
  interface deprecatedLinkProps {
    setAuthPage: React.Dispatch<React.SetStateAction<page>>;
  }
  interface resetPasswordProps {
    setAuthPage: React.Dispatch<React.SetStateAction<page>>;
    code: string;
  }
  interface successfullyResetPasswordProps {
    setAuthPage: React.Dispatch<React.SetStateAction<page>>;
  }
}

export default login;
