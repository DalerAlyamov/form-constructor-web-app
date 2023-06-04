import register from "./register";
import login from "./login";
import sendResetpassLink from "./send-resetpass-link";
import checkResetpassCode from "./check-resetpass-code";
import resetPassword from "./reset-password";

const api = {
  register,
  login,
  sendResetpassLink,
  checkResetpassCode,
  resetPassword,
};

export default api;
