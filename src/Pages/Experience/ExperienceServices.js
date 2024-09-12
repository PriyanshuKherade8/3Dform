import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import queryClient from "../../queryClient";

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

export const useAddExperience = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpClient.post("/add_experience", payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        Swal.fire({
          icon: "success",
          title: "Experience data added successfully",
          showConfirmButton: true,
        }).then((result) => {
          if (result?.isConfirmed) {
            navigate(`/experience-list`);
          }
        });
      }
      queryClient.invalidateQueries(["experience_list"]);
    },
  });

  return { mutate, isLoading, data, error };
};

export const useGetControlListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["control_list"],
    queryFn: () => httpClient.get("/get_control_list"),
  });

  return { data, error, isLoading };
};

export const useGetProductListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["product_list"],
    queryFn: () => httpClient.get("/get_product_list"),
  });

  return { data, error, isLoading };
};
