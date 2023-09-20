import axios from "axios";
import { useQuery } from "react-query";

const TARGET_LIST_PATH = "/api/agreement";

export const useGetTargetList = () => {
  const getTargetList = async () => {
    const response = await axios.get(TARGET_LIST_PATH)
    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    "get-target-list",
    () => getTargetList()
  );

  return {
    data,
    isLoading,
    error
  }
};
