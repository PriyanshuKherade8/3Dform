import React, { useEffect } from "react";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import {
  Box,
  Button,
  CardActions,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import TextField from "../../Components/TextField/TextField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import httpClient from "../../Api/HttpClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Routes, Route, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  useAddModelData,
  useGetModelDataById,
  useUpdateModelData,
} from "./ModelServices";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Validation schema using Yup
const schema = yup.object().shape({
  // model_id: yup.string().required("Model ID is required"),
  model_name: yup.string().required("Model Name is required"),
  model_path: yup.string().required("Model Path is required"),
  user_id: yup.mixed().required("User id is required"),
  project_id: yup.mixed().required("Project id is required"),
  links: yup
    .array()
    .of(
      yup.object().shape({
        link_id: yup.string().required("Link ID is required"),
        xid: yup.string().required("XID is required"),
        name: yup.string().required("Name is required"),
      })
    )
    .required("At least one link is required"),
});

const ModelForm = () => {
  let { id } = useParams();
  const location = useLocation();
  console.log("idx", id, location?.pathname);

  const { data: modelDataById, error, isLoading } = useGetModelDataById(id);
  const modelData = modelDataById?.data;

  const initialLinks = [
    {
      link_id: !!id ? "" : generateUUID(),
      xid: "",
      name: "",
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // model_id: "",
      model_name: "",
      model_path: "",
      links: initialLinks,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "links",
  });

  const addRow = () => {
    append({
      link_id: generateUUID(),
      xid: "",
      name: "",
    });
  };

  const {
    mutate: addModelForm,
    error: modelAddError,
    data: modelAddData,
  } = useAddModelData();

  const {
    mutate: updateModel,
    error: modelUpdateError,
    data: modelUpdateData,
  } = useUpdateModelData();

  const onSubmit = (data) => {
    const convertPayload = (data) => {
      return {
        model_item: {
          ...data,
          project_id: data?.project_id?.value,
          user_id: data?.user_id?.value,
          links: data.links.map((link) => ({
            ...link,
            xid: link.xid.split(",").map((id) => id.trim()),
          })),
        },
      };
    };

    const convertPayloadForUpdate = (data) => {
      return {
        model_id: data?.model_id,
        item: {
          ...(({ model_id, ...rest }) => rest)(data),
          project_id: data?.project_id?.value,
          user_id: data?.user_id?.value,
          links: data.links.map((link) => ({
            ...link,
            xid: link.xid.split(",").map((id) => id.trim()),
          })),
        },
      };
    };

    const updateModelData = convertPayloadForUpdate(data);
    const convertedData = convertPayload(data);
    !!id ? updateModel(updateModelData) : addModelForm(convertedData);
    console.log("Original payload:", data);
    console.log("convertPayloadForUpdate", updateModelData);
  };

  useEffect(() => {
    if (!!id && !!modelData) {
      // Set the simple fields
      // setValue("model_id", modelData?.model?.model_id);
      setValue("model_name", modelData?.model?.model_name);
      setValue("model_path", modelData?.model?.model_path);
      setValue("project_id", {
        label: modelData?.model?.project_id,
        value: modelData?.model?.project_id,
      });
      setValue("user_id", {
        label: modelData?.model?.user_id,
        value: modelData?.model?.user_id,
      });

      // Replace the links in the form with those from modelData
      if (modelData?.model?.links?.length) {
        replace(
          modelData.model.links.map((link) => ({
            link_id: link.link_id,
            xid: Array.isArray(link.xid) ? link.xid.join(",") : link.xid, // Convert array to comma-separated string if needed
            name: link.name,
          }))
        );
      }
    }
  }, [modelData, id, setValue, replace]);

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
          {!!id ? "Update model form" : "Add model form"}
        </CustomTypographyForTitle>
      </CustomPaper>

      <CustomPaper variant="outlined">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={3}>
              <TextField
                id="model_id"
                placeholder="Enter Model ID"
                label="Model ID"
                isRequired={true}
                {...register("model_id")}
                errors={errors}
              />
            </Grid> */}

            <Grid item xs={12} md={4}>
              <TextField
                id="model_name"
                placeholder="Enter Model Name"
                label="Model Name"
                isRequired={true}
                {...register("model_name")}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Dropdown
                maxMenuHeight={200}
                id="user_id"
                placeholder="Select"
                label="User ID"
                isRequired={true}
                control={control}
                selectObj={[{ label: "USR1000000001", value: "USR1000000001" }]}
                errors={errors}
                onInput={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Dropdown
                maxMenuHeight={200}
                id="project_id"
                placeholder="Select"
                label="Project ID"
                isRequired={true}
                control={control}
                selectObj={[{ label: "PRJ1000000001", value: "PRJ1000000001" }]}
                errors={errors}
                onInput={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="model_path"
                placeholder="Enter Model Path"
                label="Model Path"
                isRequired={true}
                {...register("model_path")}
                errors={errors}
              />
            </Grid>

            {/* Dynamic Link Fields */}
            <Box style={{ padding: "16px", width: "92%" }}>
              <Typography variant="h6" style={{ marginBottom: "16px" }}>
                Links
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableBody>
                    {/* Table Header */}
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2">Link ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">XID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">Name</Typography>
                      </TableCell>
                      <TableCell>
                        {/* Empty cell for actions (Add/Remove) */}
                      </TableCell>
                    </TableRow>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          <TextField
                            id={`links.${index}.link_id`}
                            defaultValue={field.link_id}
                            {...register(`links.${index}.link_id`)}
                            errors={errors}
                            disabled
                            readOnly={true}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id={`links.${index}.xid`}
                            defaultValue={field.xid}
                            {...register(`links.${index}.xid`)}
                            errors={errors}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id={`links.${index}.name`}
                            defaultValue={field.name}
                            {...register(`links.${index}.name`)}
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
                                  Remove Links
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
                                  Add Links
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

export default ModelForm;
