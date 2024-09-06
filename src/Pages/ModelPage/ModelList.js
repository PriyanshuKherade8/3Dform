// import React, { useMemo } from "react";
// import {
//   CustomLayout,
//   CustomPaper,
//   CustomTypographyForTitle,
// } from "../../Styles/GlobalStyles/GlobalStyles";
// import { useQuery } from "@tanstack/react-query";
// import httpClient from "../../Api/HttpClient";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ModelList = () => {
//   const fetchModelList = async () => {
//     const response = await httpClient.get("/get_model_list");
//     return response.data;
//   };

//   const {
//     data: modelData,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["model_list"],
//     queryFn: fetchModelList,
//   });

//   // Ensure data is always an array
//   const data = useMemo(
//     () => modelData?.modelList?.map(({ id, ...rest }) => rest) || [],
//     [modelData]
//   );

//   // Handle edit action
//   const handleEdit = (row) => {
//     console.log("Edit row:", row);
//     // Add your edit logic here
//   };

//   // Handle delete action
//   const handleDelete = (row) => {
//     console.log("Delete row:", row);
//     // Add your delete logic here
//   };

//   // Columns for the table, including a custom action column
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "model_id", // Accessor for model_id
//         header: "Model ID",
//         size: 300,
//       },
//       {
//         accessorKey: "model_name", // Accessor for model_name
//         header: "Model Name",
//         size: 300,
//       },
//       {
//         header: "Actions",
//         id: "actions", // Custom column for actions
//         size: 100,
//         Cell: ({ row }) => (
//           <>
//             <IconButton
//               color="primary"
//               onClick={() => handleEdit(row.original)}
//             >
//               <EditIcon />
//             </IconButton>
//             <IconButton
//               color="secondary"
//               onClick={() => handleDelete(row.original)}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data: data.length ? data : [],
//     enableColumnFilters: false, // Disable column filters
//     enableGlobalFilter: false, // Disable global search filter
//     enableColumnResizing: false, // Disable column resizing
//     enableDensityToggle: false, // Disable toggle density option
//     enableFullScreenToggle: false, // Disable full screen option
//     enableHiding: false, // Disable the "Show/Hide Columns" option
//     renderTopToolbar: false, // Hide the toolbar to remove the empty space
//   });

//   return (
//     <>
//       <CustomLayout>
//         <CustomPaper variant="outlined">
//           <CustomTypographyForTitle>{"Model List"}</CustomTypographyForTitle>
//           <MaterialReactTable table={table} />
//         </CustomPaper>
//       </CustomLayout>
//     </>
//   );
// };

// export default ModelList;

import React, { useMemo } from "react";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
} from "../../Styles/GlobalStyles/GlobalStyles";
import { useQuery } from "@tanstack/react-query";
import httpClient from "../../Api/HttpClient";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ModelList = () => {
  const navigate = useNavigate(); // Use the navigate hook

  const fetchModelList = async () => {
    const response = await httpClient.get("/get_model_list");
    return response.data;
  };

  const {
    data: modelData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["model_list"],
    queryFn: fetchModelList,
  });

  // Ensure data is always an array
  const data = useMemo(
    () => modelData?.modelList?.map(({ id, ...rest }) => rest) || [],
    [modelData]
  );

  // Handle edit action
  const handleEdit = (row) => {
    // Navigate to the edit page with the model ID as a parameter
    navigate(`/edit-model`);
  };

  // Handle delete action
  const handleDelete = (row) => {
    // Navigate to the delete page with the model ID as a parameter
    // navigate(`/delete-model/${row.model_id}`);
  };

  // Columns for the table, including a custom action column
  const columns = useMemo(
    () => [
      {
        accessorKey: "model_id", // Accessor for model_id
        header: "Model ID",
        size: 300,
      },
      {
        accessorKey: "model_name", // Accessor for model_name
        header: "Model Name",
        size: 300,
      },
      {
        header: "Actions",
        id: "actions", // Custom column for actions
        size: 100,
        Cell: ({ row }) => (
          <>
            <IconButton
              color="primary"
              onClick={() => handleEdit(row.original)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
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

  const table = useMaterialReactTable({
    columns,
    data: data.length ? data : [],
    enableColumnFilters: false, // Disable column filters
    enableGlobalFilter: false, // Disable global search filter
    enableColumnResizing: false, // Disable column resizing
    enableDensityToggle: false, // Disable toggle density option
    enableFullScreenToggle: false, // Disable full screen option
    enableHiding: false, // Disable the "Show/Hide Columns" option
    renderTopToolbar: false, // Hide the toolbar to remove the empty space
  });

  return (
    <>
      <CustomLayout>
        <CustomPaper variant="outlined">
          <CustomTypographyForTitle>{"Model List"}</CustomTypographyForTitle>
          <MaterialReactTable table={table} />
        </CustomPaper>
      </CustomLayout>
    </>
  );
};

export default ModelList;
