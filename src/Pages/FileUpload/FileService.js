import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient, { httpApi, httpApiMultipart } from "../../Api/HttpClient";
import Swal from "sweetalert2";
import queryClient from "../../queryClient";

export const useGetFileListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["file_list"],
    queryFn: () => httpClient.get("/get_product_list"),
  });

  return { data, error, isLoading };
};

export const useGetUserListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user_list"],
    queryFn: () => httpApi.get("/users/get_users"),
  });

  return { data, error, isLoading };
};

export const useGetProjectListData = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["project_data", id],
    queryFn: () => httpApi.get(`/users/get_projects?user=${id}`),
    enabled: !!id,
  });

  return { data, error, isLoading };
};

export const useGetListData = (userProjectInfo) => {
  console.log("userProjectInfov", userProjectInfo);
  const { data, error, isLoading } = useQuery({
    queryKey: ["file_list_data", userProjectInfo],
    queryFn: () =>
      httpApi.get(
        `/store/get_item_list?user=${userProjectInfo?.selectedUser}&project=${userProjectInfo?.selectedUserProject}`
      ),
    // enabled: !!userProjectInfo,
  });

  return { data, error, isLoading };
};

export const useAddFileData = () => {
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpApiMultipart.post(
        "/store/upload_item",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        Swal.fire({
          icon: "success",
          title: "file data added successfully",
          showConfirmButton: true,
        });
      }
      queryClient.invalidateQueries(["project_list"]);
    },
  });

  return { mutate, isLoading, data, error };
};
