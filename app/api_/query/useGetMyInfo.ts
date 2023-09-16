import axios from "axios";
import { useQuery } from "react-query";

const MY_INFO_PATH = "/api/my_info";

export const useGetMyInfo = () => {
  const getMyInfo = async () => {
    const response = await axios.get(MY_INFO_PATH)
    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    "get-user-info",
    () => getMyInfo()
  );

  return {
    data,
    isLoading,
    error
  }
};
