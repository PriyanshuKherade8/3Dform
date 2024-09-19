import React, { useEffect, useMemo, useState } from "react";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
  PrimaryColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import { Button, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  useAddFileData,
  useGetFileListData,
  useGetListData,
  useGetProjectListData,
  useGetUserListData,
} from "./FileService";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import CustomModal from "../../Components/Modal/CustomModal";
import TextField from "../../Components/TextField/TextField";
import FilePicker from "../../Components/FilePicker/FilePicker";

const FileUpload = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: addFile, data: addDataMessage } = useAddFileData();

  const onSubmit = (data) => {
    const transformedData = {
      name: data.name,
      user: data.user?.value,
      project: data.project?.value,
      type: data.type?.value,
      file: data.file,
    };

    // Example: Sending transformedData to the server
    const formData = new FormData();
    formData.append("file", data?.file);
    formData.append("name", transformedData.name);
    formData.append("user", transformedData.user);
    formData.append("project", transformedData.project);
    formData.append("type", transformedData.type);
    addFile(formData);
  };

  // Reset form fields and close modal if addDataMessage.status is true
  useEffect(() => {
    if (addDataMessage?.status === true) {
      reset({
        name: "",
        user: "",
        project: "",
        type: "",
        file: "",
      });
      handleCloseModal();
    }
  }, [addDataMessage, reset]);

  const { data: userData } = useGetUserListData();

  const userList = userData?.data?.user_list?.map((item) => ({
    label: item?.user_name,
    value: item?.user_id,
  }));

  const { user, project } = watch();
  const selectedUser = user?.value;
  const selectedUserProject = project?.value;
  const userProjectInfo = { selectedUser, selectedUserProject };
  const { data: fileListData } = useGetListData(userProjectInfo);

  const data = useMemo(
    () =>
      fileListData?.data?.Contents?.map(({ user, project, ...rest }) => rest) ||
      [],
    [fileListData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 300,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 300,
      },
      {
        accessorKey: "last_modified",
        header: "Last Modified",
        size: 300,
      },
      {
        accessorKey: "size",
        header: "Size",
        size: 300,
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
        onClick={handleOpenModal}
        sx={{
          marginLeft: "auto",
          backgroundColor: "#16325B",
          color: "#F5F5F5",
          fontSize: "12px",
          padding: "7px",
          fontWeight: "600",
        }}
      >
        Add File
      </Button>
    ),
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#16325B",
        color: "#F5F5F5",
      },
    },
  });

  const { data: projectData } = useGetProjectListData(selectedUser);
  const projectList = projectData?.data?.project_list?.map((item) => ({
    label: item?.project_name,
    value: item?.project_id,
  }));

  const modeList = [
    { label: "model", value: "model" },
    { label: "material", value: "material" },
    { label: "icons", value: "icons" },
    { label: "images", value: "images" },
  ];

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
          {"File upload"}
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

      <CustomModal open={openModal} onClose={handleCloseModal} title="Add File">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                id="name"
                placeholder="Enter Name"
                label="Name"
                isRequired={true}
                {...register("name")}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Dropdown
                maxMenuHeight={200}
                id="type"
                placeholder="Select"
                label="Type"
                isRequired={true}
                control={control}
                selectObj={modeList}
                errors={errors}
                onInput={true}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FilePicker control={control} name="file" label="Select File" />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: PrimaryColor }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </CustomLayout>
  );
};

export default FileUpload;
