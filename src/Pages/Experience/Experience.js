import React, { useMemo } from "react";
import { useGetExperienceListData } from "./ExperienceServices";
import { useNavigate } from "react-router-dom";
import { Button, CardContent, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
} from "../../Styles/GlobalStyles/GlobalStyles";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import {
  useGetProjectListData,
  useGetUserListData,
} from "../FileUpload/FileService";

const Experience = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const { user, project } = watch();

  const selectedUser = user?.value;
  const selectedUserProject = project?.value;

  const userProjectInfo = { selectedUser, selectedUserProject };

  const { data: userData } = useGetUserListData();

  const userList = userData?.data?.user_list?.map((item) => ({
    label: item?.user_name,
    value: item?.user_id,
  }));

  const { data: projectData } = useGetProjectListData(selectedUser);
  const projectList = projectData?.data?.project_list?.map((item) => ({
    label: item?.project_name,
    value: item?.project_id,
  }));

  const {
    data: experienceData,
    error,
    isLoading,
  } = useGetExperienceListData(userProjectInfo);
  const data = useMemo(
    () =>
      experienceData?.data?.experienceList?.map(({ id, ...rest }) => rest) ||
      [],
    [experienceData]
  );

  const handleEdit = (row) => {
    const { user, project } = getValues();
    const selectedUser = user?.value;
    const selectedUserProject = project?.value;

    console.log(
      "Selected User and Project:",
      selectedUser,
      selectedUserProject
    );

    if (selectedUser && selectedUserProject) {
      navigate(
        `/edit-experience/${row.experience_id}?user=${selectedUser}&project=${selectedUserProject}`
      );
    } else {
      alert("User or project is not selected");
    }
  };

  const handleAddNewExperience = () => {
    if (selectedUser && selectedUserProject) {
      const params = new URLSearchParams();
      params.append("user", selectedUser);
      params.append("project", selectedUserProject);

      navigate({
        pathname: "/add-experience",
        search: `?${params.toString()}`,
      });
    } else {
      alert(
        "Please select both a User and a Project before adding a new experience."
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "experience_id",
        header: "Experience Id",
        size: 300,
      },
      {
        header: "Actions",
        id: "actions",
        size: 100,
        Cell: ({ row }) => (
          <>
            <IconButton
              style={{ color: "#227B94" }}
              onClick={() => handleEdit(row.original)}
            >
              <EditIcon />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data.length ? data : [],
    enableColumnFilters: false,
    enableGlobalFilter: false,
    enableColumnResizing: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleAddNewExperience}
        sx={{
          marginLeft: "auto",
          backgroundColor: "#16325B",
          color: "#F5F5F5",
          fontSize: "12px",
          padding: "7px",
          fontWeight: "600",
        }}
      >
        Add Experience
      </Button>
    ),
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#16325B",
        color: "#F5F5F5",
      },
    },
  });

  const onSubmit = (data) => {};

  return (
    <CustomLayout variant={"outlined"}>
      <CustomPaper variant="outlined">
        <CustomTypographyForTitle
          style={{
            color: "#16325B",
            fontWeight: "700",
            padding: "5px",
          }}
        >
          {"Experience List"}
        </CustomTypographyForTitle>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <Dropdown
                  maxMenuHeight={200}
                  id="user"
                  placeholder="Select"
                  label="User"
                  isRequired={true}
                  control={control}
                  selectObj={userList}
                  errors={errors}
                  onInput={true}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Dropdown
                  maxMenuHeight={200}
                  id="project"
                  placeholder="Select"
                  label="Project"
                  isRequired={true}
                  control={control}
                  selectObj={projectList}
                  errors={errors}
                  onInput={true}
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </CustomPaper>
      <MaterialReactTable table={table} />
    </CustomLayout>
  );
};

export default Experience;
