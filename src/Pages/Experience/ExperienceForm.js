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
import { useParams } from "react-router-dom";
import { useGetEnviromentListData } from "./ExperienceServices";

// Yup validation schema
const schema = yup.object().shape({
  mode: yup.mixed().required("Mode is required"),
  environment: yup.mixed().required("Environment is required"),
  viewport: yup
    .array()
    .of(
      yup.object().shape({
        viewport_name: yup.string().required("Viewport name is required"),
        transition_lower_limit: yup
          .string()
          .required("Transition lower limit is required"),
        transition_upper_limit: yup
          .string()
          .required("Transition upper limit is required"),
        panel_position: yup.string().required("Panel position is required"),
        panel_width: yup.string().required("Panel width is required"),
        panel_height: yup.string().required("Panel height is required"),
        is_canvas_fullscreen: yup
          .string()
          .required("Canvas fullscreen is required"),
        camera_adjustment_factor: yup
          .string()
          .required("Camera adjustment factor is required"),
        camera_look_at_delta: yup
          .string()
          .required("Camera look-at delta is required"),
      })
    )
    .required("At least one link is required"),
});

const ExperienceForm = () => {
  const { id } = useParams();

  const initialLinks = [
    {
      viewport_name: "",
      transition_lower_limit: "",
      transition_upper_limit: "",
      panel_position: "",
      panel_width: "",
      panel_height: "",
      is_canvas_fullscreen: "",
      camera_adjustment_factor: "",
      camera_look_at_delta: "",
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
      mode: "",
      environment: "",
      viewport: initialLinks,
    },
  });

  const { data: environmentListData } = useGetEnviromentListData();
  console.log(
    "environmentListData",
    environmentListData?.data?.environmentList
  );

  const environmentList = environmentListData?.data?.environmentList?.map(
    (item) => {
      return {
        label: item?.id,
        value: item?.id,
      };
    }
  );

  // Field array for dynamic link fields
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "viewport",
  });

  // Add new row function
  const addRow = () => {
    append({
      viewport_name: "",
      transition_lower_limit: "",
      transition_upper_limit: "",
      panel_position: "",
      panel_width: "",
      panel_height: "",
      is_canvas_fullscreen: "",
      camera_adjustment_factor: "",
      camera_look_at_delta: "",
    });
  };

  // Form submit handler
  const onSubmit = (data) => {
    console.log("pyloadmm", data);

    const addPayload = {
      ...data,
      environment: data?.environment?.value,
      mode: data?.mode?.value,
    };
    console.log("addPayload", addPayload);
  };

  return (
    <CustomLayout>
      <CustomPaper variant="outlined">
        <CustomTypographyForTitle
          style={{ color: PrimaryColor, fontWeight: "700", padding: "5px" }}
        >
          {id ? "Update Experience" : "Add Experience"}
        </CustomTypographyForTitle>
      </CustomPaper>

      <CustomPaper variant="outlined">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Dropdown
                id="mode"
                placeholder="Select Mode"
                label="Mode"
                control={control}
                selectObj={[
                  { label: "Story", value: "is_story_mode" },
                  { label: "Collection", value: "is_collection_mode" },
                  { label: "Showcase", value: "is_showcase_mode" },
                ]}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Dropdown
                id="environment"
                placeholder="Select Environment"
                label="Environment"
                control={control}
                selectObj={environmentList}
                errors={errors}
              />
            </Grid>
          </Grid>

          {/* Links Section */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Viewport</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  {/* Table Header */}
                  <TableRow>
                    <TableCell>Viewport Name</TableCell>
                    <TableCell>Transition Lower Limit</TableCell>
                    <TableCell>Transition Upper Limit</TableCell>
                    <TableCell>Panel Position</TableCell>
                    <TableCell>Panel Width</TableCell>
                    <TableCell>Panel Height</TableCell>
                    <TableCell>is_canvas_fullscreen</TableCell>
                    <TableCell>camera_adjustment_factor</TableCell>
                    <TableCell>camera_look_at_delta</TableCell>
                    <TableCell>{/* Action Buttons */}</TableCell>
                  </TableRow>

                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.viewport_name`}
                          {...register(`viewport.${index}.viewport_name`)}
                          defaultValue={field.viewport_name}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.transition_lower_limit`}
                          {...register(
                            `viewport.${index}.transition_lower_limit`
                          )}
                          defaultValue={field.xid}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.transition_upper_limit`}
                          {...register(
                            `viewport.${index}.transition_upper_limit`
                          )}
                          defaultValue={field.transition_upper_limit}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.panel_position`}
                          {...register(`viewport.${index}.panel_position`)}
                          defaultValue={field.panel_position}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.panel_width`}
                          {...register(`viewport.${index}.panel_width`)}
                          defaultValue={field.panel_width}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.panel_height`}
                          {...register(`viewport.${index}.panel_height`)}
                          defaultValue={field.panel_height}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.is_canvas_fullscreen`}
                          {...register(
                            `viewport.${index}.is_canvas_fullscreen`
                          )}
                          defaultValue={field.is_canvas_fullscreen}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.camera_adjustment_factor`}
                          {...register(
                            `viewport.${index}.camera_adjustment_factor`
                          )}
                          defaultValue={field.camera_adjustment_factor}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`viewport.${index}.camera_look_at_delta`}
                          {...register(
                            `viewport.${index}.camera_look_at_delta`
                          )}
                          defaultValue={field.camera_look_at_delta}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <Grid container justifyContent="flex-end" spacing={1}>
                          {fields.length > 1 && (
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
                                Remove
                              </Button>
                            </Grid>
                          )}
                          {fields.length - 1 === index && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="contained"
                                onClick={addRow}
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

          <CardActions
            style={{ justifyContent: "flex-end", marginTop: "16px" }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: PrimaryColor }}
            >
              {id ? "Update" : "Submit"}
            </Button>
          </CardActions>
        </form>
      </CustomPaper>
    </CustomLayout>
  );
};

export default ExperienceForm;
