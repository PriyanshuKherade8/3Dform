import React, { useMemo } from "react";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
} from "../../Styles/GlobalStyles/GlobalStyles";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useGetModelListData } from "./ModelServices";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const ModelList = () => {
  const navigate = useNavigate();

  const { data: modelData, error, isLoading } = useGetModelListData();

  const data = useMemo(
    () => modelData?.data?.modelList?.map(({ id, ...rest }) => rest) || [],
    [modelData]
  );

  const handleEdit = (row) => {
    navigate(`/edit-model/${row.model_id}`);
  };

  const handleDelete = (row) => {
    // Implement delete action or navigate to the delete page
  };

  // Columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "model_id",
        header: "Model ID",
        size: 300,
      },
      {
        accessorKey: "model_name",
        header: "Model Name",
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
            <IconButton
              style={{ color: "#A04747" }}
              onClick={() => handleDelete(row.original)}
            >
              <DeleteIcon />
            </IconButton>
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
        onClick={() => navigate("/add-form-model")}
        sx={{
          marginLeft: "auto",
          backgroundColor: "#16325B",
          color: "#F5F5F5",
          fontSize: "12px",
          padding: "7px",
          fontWeight: "600",
        }}
      >
        Add New Model
      </Button>
    ),
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#16325B",
        color: "#F5F5F5",
      },
    },
  });

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
          {"Model List"}
        </CustomTypographyForTitle>
      </CustomPaper>
      <MaterialReactTable table={table} />
    </CustomLayout>
  );
};

export default ModelList;
