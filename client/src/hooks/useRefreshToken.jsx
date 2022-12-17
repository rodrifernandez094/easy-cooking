import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const handleRefreshToken = async () => {
    const response = await axios.get("/refreshtoken", {
      withCredentials: true,
    });
    setAuth((prevValue) => {
      return {
        ...prevValue,
        accessToken: response.data.accessToken,
        userName: response.data.userName,
      };
    });
    return {
      accessToken: response.data.accessToken,
      userName: response.data.userName,
    };
  };
  return handleRefreshToken;
};

export default useRefreshToken;
