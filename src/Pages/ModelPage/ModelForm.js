import React from "react";
import {
  CustomLayout,
  CustomPaper,
  CustomTypographyForTitle,
} from "../../Styles/GlobalStyles/GlobalStyles";
import { Box, Button, CardActions, Grid } from "@mui/material";
import TextField from "../../Components/TextField/TextField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import httpClient from "../../Api/HttpClient";
import { useMutation } from "@tanstack/react-query";

// Move generateUUID to the top to avoid initialization issues
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Validation schema using Yup
const schema = yup.object().shape({
  model_id: yup.string().required("Model ID is required"),
  model_name: yup.string().required("Model Name is required"),
  model_path: yup.string().required("Model Path is required"),
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
  // Initialize default values for the form without calling the function in the object
  const initialLinks = [
    {
      link_id: generateUUID(),
      xid: "",
      name: "",
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      model_id: "",
      model_name: "",
      model_path: "",
      links: initialLinks, // Use the variable with generated UUID instead of calling the function directly
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });
  console.log("errorsone", errors);

  // Function to append a new row with default values
  const addRow = () => {
    append({
      link_id: generateUUID(),
      xid: "",
      name: "",
    });
  };

  const rotateCall = async (payload) => {
    const response = await httpClient.post("/add_model", payload);
    return response.data;
  };

  const {
    mutate: addModelForm,
    isLoading: isMutating,
    error: mutationError,
    data: allData,
  } = useMutation({
    mutationFn: (payload) => rotateCall(payload),
  });

  // Handler for form submission
  const onSubmit = (data) => {
    alert("Form submitted successfully!");

    const convertPayload = (data) => {
      return {
        ...data,
        links: data.links.map((link) => ({
          ...link,
          xid: link.xid.split(",").map((id) => id.trim()), // Convert comma-separated XID string to array
        })),
      };
    };

    const convertedData = convertPayload(data);
    addModelForm(convertedData);
    console.log("Original payload:", data);
    console.log("Converted payload:", convertedData);
  };

  return (
    <CustomLayout>
      <CustomPaper variant="outlined">
        <CustomTypographyForTitle>{"Add model form"}</CustomTypographyForTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                id="model_id"
                placeholder="Enter Model ID"
                label="Model ID"
                isRequired={true}
                {...register("model_id")}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="model_name"
                placeholder="Enter Model Name"
                label="Model Name"
                isRequired={true}
                {...register("model_name")}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Dropdown
                maxMenuHeight={200}
                id="user_id"
                placeholder="Select"
                label="User ID"
                isRequired={true}
                control={control}
                selectObj={[
                  { label: "xyz", value: 1 },
                  { label: "abc", value: 2 },
                ]}
                errors={errors}
                onInput={true}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Dropdown
                maxMenuHeight={200}
                id="project_id"
                placeholder="Select"
                label="Project ID"
                isRequired={true}
                control={control}
                selectObj={[
                  { label: "xyz", value: 1 },
                  { label: "abc", value: 2 },
                ]}
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
            <Box style={{ padding: "8px", width: "100%" }}>
              {fields.map((field, index) => (
                <Grid container spacing={1} key={field.id}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id={`links.${index}.link_id`}
                      label="Link ID"
                      defaultValue={field.link_id}
                      isRequired={true}
                      {...register(`links.${index}.link_id`)}
                      errors={errors}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id={`links.${index}.xid`}
                      label="XID"
                      defaultValue={field.xid}
                      isRequired={true}
                      {...register(`links.${index}.xid`)}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id={`links.${index}.name`}
                      label="Name"
                      defaultValue={field.name}
                      isRequired={true}
                      {...register(`links.${index}.name`)}
                      errors={errors}
                    />
                  </Grid>

                  {/* Add/Remove Buttons aligned to the right */}
                  <Grid item xs={12}>
                    <Grid container justifyContent="flex-end" spacing={2}>
                      {/* Remove Button - Only show if there's more than one row */}
                      {fields.length !== 1 && (
                        <Grid item>
                          <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      )}

                      {/* Add Button only on the last row */}
                      {fields.length - 1 === index && (
                        <Grid item>
                          <Button
                            type="button"
                            variant="contained"
                            onClick={addRow}
                            size="small"
                          >
                            Add
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Grid>

          {/* Submit Button */}
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit" size="small">
              Submit
            </Button>
          </CardActions>
        </form>
      </CustomPaper>
    </CustomLayout>
  );
};

export default ModelForm;
