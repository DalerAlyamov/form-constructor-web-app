import isDev from "./is-dev";

const devURL = "http://192.168.1.32:3020";
const prodURL = "http://192.168.1.32:3020";

const baseURL = isDev ? devURL : prodURL;

export default baseURL;
