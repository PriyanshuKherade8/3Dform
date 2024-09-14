import React from "react";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import TextField from "../../Components/TextField/TextField";

const ProductForm = () => {
  const { id } = useParams();

  const initialComponent = [
    {
      component_id: "",
      model: "",
      link_id: "",
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    components: initialComponent,
  });

  // Field array for dynamic viewport fields
  const {
    fields: viewComponentFields,
    append: appendComponent,
    remove: removeComponent,
  } = useFieldArray({
    control,
    name: "components",
  });

  // Add new row functions for both viewports and controls
  const addComponentRow = () => {
    appendComponent({
      component_id: "",
      model: "",
      link_id: "",
    });
  };

  const onSubmit = (data) => {
    console.log("productdata", data);
  };
  return (
    <CustomLayout>
      <CustomPaper variant="outlined">
        <CustomTypographyForTitle
          style={{ color: PrimaryColor, fontWeight: "700", padding: "5px" }}
        >
          {id ? "Update Product" : "Add Product"}
        </CustomTypographyForTitle>
      </CustomPaper>
      <CustomPaper variant="outlined">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                id="product_name"
                placeholder="Enter Product Name"
                label="Product Name"
                isRequired={true}
                {...register("product_name")}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="user_id"
                placeholder="Enter User ID"
                label="user ID"
                isRequired={true}
                {...register("user_id")}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="project_id"
                placeholder="Enter Project ID"
                label="Project ID"
                isRequired={true}
                {...register("project_id")}
                errors={errors}
              />
            </Grid>
            {/* <Grid item xs={12} md={3}></Grid> */}
          </Grid>
          {/* Component Section */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Components</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Component Id</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Link Id</TableCell>
                    <TableCell>{/* Action Buttons */}</TableCell>
                  </TableRow>

                  {viewComponentFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <TextField
                          id={`components.${index}.component_id`}
                          {...register(`components.${index}.component_id`)}
                          defaultValue={field.component_id}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`components.${index}.model`}
                          {...register(`components.${index}.model`)}
                          defaultValue={field.model}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`components.${index}.link_id`}
                          {...register(`components.${index}.link_id`)}
                          defaultValue={field.link_id}
                          errors={errors}
                        />
                      </TableCell>

                      <TableCell>
                        <Grid container justifyContent="flex-end" spacing={1}>
                          {viewComponentFields.length > 1 && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="outlined"
                                size="small"
                                onClick={() => removeComponent(index)}
                                style={{
                                  backgroundColor: DeleteColor,
                                  color: TextColor,
                                }}
                              >
                                Remove
                              </Button>
                            </Grid>
                          )}
                          {viewComponentFields.length - 1 === index && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="contained"
                                onClick={addComponentRow}
                                style={{ backgroundColor: PrimaryColor }}
                                size="small"
                              >
                                Add
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </form>
      </CustomPaper>
    </CustomLayout>
  );
};

export default ProductForm;
