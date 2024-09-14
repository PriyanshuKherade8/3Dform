import { useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";

export const useGetProductListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["product_list"],
    queryFn: () => httpClient.get("/get_product_list"),
  });

  return { data, error, isLoading };
};
