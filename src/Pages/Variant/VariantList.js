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

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useGetVariantListData } from "./VariantServices";

const VariantList = () => {
  const navigate = useNavigate();

  const { data: variantData, error, isLoading } = useGetVariantListData();
  console.log("variantData", variantData);

  const data = useMemo(
    () => variantData?.data?.variantList?.map(({ id, ...rest }) => rest) || [],
    [variantData]
  );

  const handleEdit = (row) => {
    navigate(`/edit-variant/${row.variant_id}`);
  };

  const handleDelete = (row) => {
    // Implement delete action or navigate to the delete page
  };

  // Columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "variant_id",
        header: "Variant ID",
        size: 300,
      },
      {
        accessorKey: "variant_name",
        header: "Variant Name",
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
        onClick={() => navigate("/add-variant")}
        sx={{
          marginLeft: "auto",
          backgroundColor: "#16325B",
          color: "#F5F5F5",
          fontSize: "12px",
          padding: "7px",
          fontWeight: "600",
        }}
      >
        Add New Variant
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
          {"Variant List"}
        </CustomTypographyForTitle>
      </CustomPaper>
      <MaterialReactTable table={table} />
    </CustomLayout>
  );
};

export default VariantList;
