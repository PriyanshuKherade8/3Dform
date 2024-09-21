import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CardActions,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import TextField from "../../Components/TextField/TextField";
import {
  useAddVariantData,
  useGetVariantDataById,
  useUpdateVariantData,
} from "./VariantServices";

const schema = yup.object().shape({});
const initialVariantIcons = [
  {
    file_type: "",
    path: "",
  },
];

const VariantForm = () => {
  let { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");
  const project = queryParams.get("project");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      variant_icons: initialVariantIcons,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "variant_icons",
  });

  const addRow = () => {
    append({
      file_type: "",
      path: "",
    });
  };

  const { mutate: addVariant } = useAddVariantData();
  const { data: variantData } = useGetVariantDataById(id);
  const { mutate: updateVariant } = useUpdateVariantData();
  console.log("kvk", variantData?.data?.variant);
  const variantDataToSet = variantData?.data?.variant;

  const onSubmit = (data) => {
    console.log("variantdata", data);
    const addPayload = { variant_item: { ...data } };
    const updatePayload = {
      variant_id: id,
      item: {
        ...data,
      },
    };
    console.log("addPayloadv", updatePayload);
    !!id ? updateVariant(updatePayload) : addVariant(addPayload);
  };

  useEffect(() => {
    if (!!user && !!project) {
      setValue("user_id", user);
      setValue("project_id", project);
    }
  }, [user, project]);

  useEffect(() => {
    if (!!id && !!variantData) {
      setValue("user_id", variantDataToSet?.user_id);
      setValue("project_id", variantDataToSet?.project_id);
      setValue("variant_type", variantDataToSet?.variant_type);
      setValue("variant_file_path", variantDataToSet?.variant_file_path);
      setValue("variant_value", variantDataToSet?.variant_value);
      setValue("variant_name", variantDataToSet?.variant_name);

      if (variantDataToSet?.variant_icons?.length > 0) {
        setValue("variant_icons", variantDataToSet.variant_icons);

        variantDataToSet.variant_icons.forEach((icon, index) => {
          setValue(`variant_icons.${index}.file_type`, icon.file_type);
          setValue(`variant_icons.${index}.path`, icon.path);
        });
      }
    }
  }, [variantData, id]);

  return (
    <CustomLayout>
      <CustomPaper variant="outlined">
        <CustomTypographyForTitle
          style={{
            color: PrimaryColor,
            fontWeight: "700",
            padding: "5px",
          }}
        >
          {!!id ? "Update variant" : "Add variant"}
        </CustomTypographyForTitle>
      </CustomPaper>

      <CustomPaper variant="outlined">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={3}>
              <TextField
                id="variant_id"
                placeholder="Enter variant ID"
                label="Variant ID"
                isRequired={true}
                {...register("variant_id")}
                errors={errors}
              />
            </Grid> */}
            <Grid item xs={12} md={3}>
              <TextField
                id="user_id"
                placeholder="Enter User ID"
                label="User ID"
                isRequired={true}
                {...register("user_id")}
                errors={errors}
                readOnly={true}
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
                readOnly={true}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="variant_type"
                placeholder="Enter variant type"
                label="Variant Type"
                isRequired={true}
                {...register("variant_type")}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="variant_file_path"
                placeholder="Enter variant file path"
                label="Variant File Path"
                isRequired={true}
                {...register("variant_file_path")}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="variant_value"
                placeholder="Enter variant value"
                label="Variant Value"
                isRequired={true}
                {...register("variant_value")}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="variant_name"
                placeholder="Enter variant name"
                label="Variant Name"
                isRequired={true}
                {...register("variant_name")}
                errors={errors}
              />
            </Grid>

            {/* Dynamic Link Fields */}
            <Box style={{ padding: "16px", width: "92%" }}>
              <Typography variant="h6" style={{ marginBottom: "16px" }}>
                Variant Icons
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2">File Type</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">Path</Typography>
                      </TableCell>

                      <TableCell></TableCell>
                    </TableRow>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          <TextField
                            id={`variant_icons.${index}.file_type`}
                            defaultValue={field.file_type}
                            {...register(`variant_icons.${index}.file_type`)}
                            errors={errors}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id={`variant_icons.${index}.path`}
                            defaultValue={field.path}
                            {...register(`variant_icons.${index}.path`)}
                            errors={errors}
                          />
                        </TableCell>

                        <TableCell>
                          <Grid container justifyContent="flex-end" spacing={2}>
                            {fields.length !== 1 && (
                              <Grid item>
                                <Button
                                  type="button"
                                  variant="outlined"
                                  size="small"
                                  onClick={() => remove(index)}
                                  style={{
                                    backgroundColor: DeleteColor,
                                    color: TextColor,
                                  }}
                                >
                                  Remove Variant Icons
                                </Button>
                              </Grid>
                            )}
                            {fields.length - 1 === index && (
                              <Grid item>
                                <Button
                                  type="button"
                                  variant="contained"
                                  onClick={addRow}
                                  size="small"
                                  style={{ backgroundColor: PrimaryColor }}
                                >
                                  Add Variant Icons
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
          </Grid>

          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: PrimaryColor }}
            >
              {!!id ? "Update" : "Submit"}
            </Button>
          </CardActions>
        </form>
      </CustomPaper>
    </CustomLayout>
  );
};

export default VariantForm;
