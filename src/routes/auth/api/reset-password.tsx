import request from "common/utils/request";
import API_ROUTES from "common/constants/api-routes";

interface IBody {
  code: string;
  password: string;
}

const resetPassword = async (body: IBody) => {
  const response = await request()
    .post(API_ROUTES.resetPassword, body)
    .then((res) => res.data);

  if (response.status === 403) return response.message;
  if (response.status === 409) return response.message;
  if (response.status === 200) return true;
  return false;
};

export default resetPassword;
