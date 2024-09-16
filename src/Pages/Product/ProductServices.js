import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import queryClient from "../../queryClient";

export const useGetProductListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["product_list"],
    queryFn: () => httpClient.get("/get_product_list"),
  });

  return { data, error, isLoading };
};

export const useAddProductData = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpClient.post("/add_product", payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        Swal.fire({
          icon: "success",
          title: "Product data added successfully",
          showConfirmButton: true,
        }).then((result) => {
          if (result?.isConfirmed) {
            navigate(`/product-list`);
          }
        });
      }
      queryClient.invalidateQueries(["product_list"]);
    },
  });

  return { mutate, isLoading, data, error };
};
