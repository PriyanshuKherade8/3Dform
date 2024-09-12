import React, { useMemo } from "react";
import { useGetExperienceListData } from "./ExperienceServices";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
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

const Experience = () => {
  const navigate = useNavigate();
  const { data: experienceData, error, isLoading } = useGetExperienceListData();
  const data = useMemo(
    () =>
      experienceData?.data?.experienceList?.map(({ id, ...rest }) => rest) ||
      [],
    [experienceData]
  );

  const handleEdit = (row) => {
    navigate(`/edit-experience/${row.experience_id}`);
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
        onClick={() => navigate("/add-experience")}
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
      </CustomPaper>
      <MaterialReactTable table={table} />
    </CustomLayout>
  );
};

export default Experience;
