import { isAxiosError } from "axios";


//(act) دت عشان اهندل الخطا اللي في صفحات  الاكت 
const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data.message || error.message;
  } else {
    return "An unexpected error";
  }
};

export default axiosErrorHandler;
