import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import queryClient from "../../queryClient";

export const useGetVariantListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["variant_list"],
    queryFn: () => httpClient.get("/get_variant_list"),
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
