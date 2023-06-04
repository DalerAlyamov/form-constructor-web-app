import request from "common/utils/request";
import API_ROUTES from "common/constants/api-routes";

const checkAuthToken = async () => {
  const response = await request()
    .get(API_ROUTES.checkAuthToken)
    .then((res) => res.data);

  if (response.status === 200) return true;
  if (response.status === 401) return false;
};

export default checkAuthToken;
