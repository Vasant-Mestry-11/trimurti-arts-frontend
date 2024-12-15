import { LOCAL_URLS, PROD_URLS } from "../config/urls.config";

const useGetURL = () => {
  const url = import.meta.env.PROD ? PROD_URLS.url : LOCAL_URLS.url;
  return url;
};

export default useGetURL;
