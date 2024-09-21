import React, { useMemo } from "react";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
} from "../../Styles/GlobalStyles/GlobalStyles";
import { Button, CardContent, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useGetProductListData } from "./ProductServices";
import { useForm } from "react-hook-form";
import {
  useGetProjectListData,
  useGetUserListData,
} from "../FileUpload/FileService";
import Dropdown from "../../Components/Dropdown/Dropdown";

const ProductList = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { user, project } = watch();

  const selectedUser = user?.value;
  const selectedUserProject = project?.value;
  const userProjectInfo = { selectedUser, selectedUserProject };

  const {
    data: productData,
    error,
    isLoading,
  } = useGetProductListData(userProjectInfo);

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

  const data = useMemo(
    () => productData?.data?.productList?.map(({ id, ...rest }) => rest) || [],
    [productData]
  );

  const handleEdit = (row) => {
    navigate(`/edit-product/${row.product_id}`);
  };

  const handleDelete = (row) => {
    // Implement delete action or navigate to the delete page
  };

  const handleAddNewProduct = () => {
    if (selectedUser && selectedUserProject) {
      const params = new URLSearchParams();
      params.append("user", selectedUser);
      params.append("project", selectedUserProject);

      navigate({
        pathname: "/add-product",
        search: `?${params.toString()}`,
      });
    } else {
      alert(
        "Please select both a User and a Project before adding a new model."
      );
    }
  };

  // Columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "product_id",
        header: "Product ID",
        size: 300,
      },
      {
        accessorKey: "product_name",
        header: "Product Name",
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
            {/* <IconButton
              style={{ color: "#A04747" }}
              onClick={() => handleDelete(row.original)}
            >
              <DeleteIcon />
            </IconButton> */}
          </>
        ),
      },
    ],
    []
  );

  // Define the table settings
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
        onClick={handleAddNewProduct}
        sx={{
          marginLeft: "auto",
          backgroundColor: "#16325B",
          color: "#F5F5F5",
          fontSize: "12px",
          padding: "7px",
          fontWeight: "600",
        }}
      >
        Add New Product
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
          {"Product List"}
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

export default ProductList;
