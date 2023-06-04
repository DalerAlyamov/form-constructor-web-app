import request from "common/utils/request";
import API_ROUTES from "common/constants/api-routes";

interface IBody {
  mail: string;
}
const sendResetpassLink = async (body: IBody) => {
  const response = await request()
    .post(API_ROUTES.sendResetpassLink, body)
    .then((res) => res.data);

  if (response.status === 200) return true;
  if (response.status === 404) return response.message;
  return false;
};

export default sendResetpassLink;
