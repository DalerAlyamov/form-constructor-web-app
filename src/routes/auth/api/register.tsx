import request from "common/utils/request";
import API_ROUTES from "common/constants/api-routes";

interface IBody {
  mail: string;
  password: string;
}
interface IPayload {
  token: string;
  refresh_token: string;
}
type TStatus = 201 | 409;

const register = async (body: IBody) => {
  const response = await request<IPayload, TStatus>()
    .post(API_ROUTES.register, body)
    .then((res) => res.data);
  return response
};

export default register;
