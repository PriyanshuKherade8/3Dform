import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";
import queryClient from "../../queryClient";

export const useAddModelData = () => {
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpClient.post("/add_model", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["model_list"]);
    },
  });

  return { mutate, isLoading, data, error };
};

export const useUpdateModelData = () => {
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpClient.post("/modify_model", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["model_list"]);
    },
  });

  return { mutate, isLoading, data, error };
};

export const useGetModelListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["model_list"],
    queryFn: () => httpClient.get("/get_model_list"),
  });

  return { data, error, isLoading };
};

export const useGetModelDataById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["model_data_by_id"],
    queryFn: () => httpClient.get(`/get_model/${id}`),
    enabled: !!id,
  });
  return { data, error, isLoading };
};
