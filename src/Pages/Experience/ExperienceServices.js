import { useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";

export const useGetExperienceListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["experience_list"],
    queryFn: () => httpClient.get("/get_experience_list"),
  });

  return { data, error, isLoading };
};

export const useGetEnviromentListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["environment_list"],
    queryFn: () => httpClient.get("/get_environment_list"),
  });

  return { data, error, isLoading };
};
