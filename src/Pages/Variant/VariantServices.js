import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import queryClient from "../../queryClient";

export const useGetVariantListData = (userProjectInfo) => {
  const { selectedUser, selectedUserProject } = userProjectInfo || {};
  const { data, error, isLoading } = useQuery({
    queryKey: ["variant_list"],
    queryFn: () =>
      httpClient.get(
        `/get_variant_list?user=${selectedUser}&project=${selectedUserProject}`
      ),
    enabled: !!selectedUser && !!selectedUserProject,
  });

  return { data, error, isLoading };
};

export const useAddVariantData = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpClient.post("/add_variant", payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        Swal.fire({
          icon: "success",
          title: "variant data added successfully",
          showConfirmButton: true,
        }).then((result) => {
          if (result?.isConfirmed) {
            navigate(`/variant-list`);
          }
        });
      }
      queryClient.invalidateQueries(["variant_list"]);
    },
  });

  return { mutate, isLoading, data, error };
};

export const useGetVariantDataById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["variant_data_by_id"],
    queryFn: () => httpClient.get(`/get_variant/${id}`),
    enabled: !!id,
  });
  return { data, error, isLoading };
};

export const useUpdateVariantData = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpClient.post("/modify_variant", payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        Swal.fire({
          icon: "success",
          title: "Variant data updated successfully",
          showConfirmButton: true,
        }).then((result) => {
          if (result?.isConfirmed) {
            navigate(`/variant-list`);
          }
        });
      }
      queryClient.invalidateQueries(["variant_list"]);
    },
  });

  return { mutate, isLoading, data, error };
};
