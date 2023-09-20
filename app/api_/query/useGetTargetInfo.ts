import axios from "axios";
import { useQuery } from "react-query";

const TARGET_INFO_PATH = "/api/matching/target_info";

export const useGetTargetInfo = () => {
  const getTargetInfo = async () => {
    const response = await axios.get(TARGET_INFO_PATH)
    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    "get-target-info",
    () => getTargetInfo()
  );

  return {
    data,
    isLoading,
    error
  }
};
