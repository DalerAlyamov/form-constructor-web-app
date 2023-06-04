import request from "common/utils/request";
import API_ROUTES from "common/constants/api-routes";

interface IBody {
  code: string;
}
const checkResetPassCode = async (body: IBody) => {
  const response = await request()
    .post(API_ROUTES.checkResetPassCode, body)
    .then((res) => res.data);

  if (response.status === 200) return true;
  if (response.status === 403) return false;
  return false;
};

export default checkResetPassCode;
