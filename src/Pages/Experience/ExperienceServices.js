import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import queryClient from "../../queryClient";

export const useGetExperienceListData = (userProjectInfo) => {
  const { selectedUser, selectedUserProject } = userProjectInfo || {};
  const { data, error, isLoading } = useQuery({
    queryKey: ["experience_list", selectedUser, selectedUserProject],
    queryFn: () =>
      httpClient.get(
        `/get_experience_list?user=${selectedUser}&project=${selectedUserProject}`
      ),
    enabled: !!selectedUser && !!selectedUserProject,
  });

  return { data, error, isLoading };
};

export const useGetEnviromentListData = (userProjectInfo) => {
  const { selectedUser, selectedUserProject } = userProjectInfo || {};
  const { data, error, isLoading } = useQuery({
    queryKey: ["environment_list", selectedUser, selectedUserProject],
    queryFn: () =>
      httpClient.get(
        `/get_environment_list?user=${selectedUser}&project=${selectedUserProject}`
      ),
    enabled: !!selectedUser && !!selectedUserProject,
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

export const useGetControlListData = (userProjectInfo) => {
  const { selectedUser, selectedUserProject } = userProjectInfo || {};
  const { data, error, isLoading } = useQuery({
    queryKey: ["control_list", selectedUser, selectedUserProject],
    queryFn: () =>
      httpClient.get(
        `/get_control_list?user=${selectedUser}&project=${selectedUserProject}`
      ),
    enabled: !!selectedUser && !!selectedUserProject,
  });

  return { data, error, isLoading };
};

export const useGetProductListData = (userProjectInfo) => {
  const { selectedUser, selectedUserProject } = userProjectInfo || {};
  const { data, error, isLoading } = useQuery({
    queryKey: ["product_list", selectedUser, selectedUserProject],
    queryFn: () =>
      httpClient.get(
        `/get_product_list?user=${selectedUser}&project=${selectedUserProject}`
      ),
    enabled: !!selectedUser && !!selectedUserProject,
  });

  return { data, error, isLoading };
};

export const useGetExperienceDataById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["experience_data_by_id"],
    queryFn: () => httpClient.get(`/get_experience/${id}`),
    enabled: !!id,
  });
  return { data, error, isLoading };
};

export const useUpdateExperienceData = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await httpClient.post("/modify_experience", payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        Swal.fire({
          icon: "success",
          title: "Experience data updated successfully",
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
