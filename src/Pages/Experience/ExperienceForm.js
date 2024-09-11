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
    .required("At least one viewport is required"),
  controls: yup
    .array()
    .of(
      yup.object().shape({
        control_id: yup.string().required("Control ID is required"),
        is_control_active: yup
          .string()
          .required("Control Active status is required"),
        default_value: yup.string().required("Default value is required"),
      })
    )
    .required("At least one control is required"),
  cameras: yup
    .array()
    .of(
      yup.object().shape({
        camera_id: yup.string().required("Camera ID is required"),
        camera_type: yup.string().required("Camera type is required"),
        camera_fov: yup.string().required("Camera FOV is required"),
        camera_near: yup.string().required("Camera near is required"),
        camera_far: yup.string().required("Camera far is required"),
        camera_position: yup.string().required("Camera position is required"),
        is_default: yup.string().required("Camera default is required"),
      })
    )
    .required("At least one camera is required"),
  products: yup
    .array()
    .of(
      yup.object().shape({
        is_active: yup.string().required("Product active status is required"),
        product: yup.string().required("Product is required"),
        is_product_active: yup
          .string()
          .required("Product active status is required"),
        product_key: yup.string().required("Product key is required"),
        custom_values: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.string().required("ID is required"),
              object: yup.string().required("Object is required"),
              values: yup.object().shape({
                x: yup.string().required("X value is required"),
                y: yup.string().required("Y value is required"),
                z: yup.string().required("Z value is required"),
              }),
            })
          )
          .required("At least one custom value is required"),
      })
    )
    .required("At least one product is required"),
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

  const initialControls = [
    {
      control_id: "",
      is_control_active: "",
      default_value: "",
    },
  ];

  const initialCameras = [
    {
      camera_id: "",
      camera_type: "",
      camera_fov: "",
      camera_near: "",
      camera_far: "",
      camera_position: "",
      is_default: "",
    },
  ];

  const initialProducts = [
    {
      is_active: "",
      product: "",
      is_product_active: "",
      // custom_values: [],
      custom_values: [{ id: "", object: "", values: { x: "", y: "", z: "" } }],
      product_key: "",
    },
  ];

  const initialSequence = [
    {
      sequence_id: "",
      shots: [
        {
          shot_id: "",
          is_first_shot: "",
          previous_shot: "",
          shot_controls: {
            duration: "",
            repeat: "",
            repeat_forever: "",
            back_to_start: "",
            easing_function: "",
            easing_type: "",
          },
          action: [
            {
              action_id: "",
              action_object_type: "",
              action_type: "",
              action_property: "",
              action_values: { x: "", y: "", z: "" },
            },
          ],
        },
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      mode: "",
      environment: "",
      viewport: initialLinks,
      controls: initialControls,
      cameras: initialCameras,
      products: initialProducts,
      sequences: initialSequence,
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

  const booleanList = [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ];

  // Field array for dynamic viewport fields
  const {
    fields: viewportFields,
    append: appendViewport,
    remove: removeViewport,
  } = useFieldArray({
    control,
    name: "viewport",
  });

  // Field array for dynamic control fields
  const {
    fields: controlFields,
    append: appendControl,
    remove: removeControl,
  } = useFieldArray({
    control,
    name: "controls",
  });

  // Field array for dynamic control fields
  const {
    fields: camerasFields,
    append: appendCameras,
    remove: removeCameras,
  } = useFieldArray({
    control,
    name: "cameras",
  });

  //Field array for dynamic products
  const {
    fields: productsFields,
    append: appendProducts,
    remove: removeProducts,
  } = useFieldArray({
    control,
    name: "products",
  });

  //Field array for sequence
  const {
    fields: sequenceFields,
    append: appendSequence,
    remove: removeSequence,
  } = useFieldArray({
    control,
    name: "sequences",
  });

  // Add new row functions for both viewports and controls
  const addViewportRow = () => {
    appendViewport({
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

  const addControlRow = () => {
    appendControl({
      control_id: "",
      is_control_active: "",
      default_value: "",
    });
  };

  const addCameraRow = () => {
    appendCameras({
      camera_id: "",
      camera_type: "",
      camera_fov: "",
      camera_near: "",
      camera_far: "",
      camera_position: "",
      is_default: "",
    });
  };

  const addProductRow = () => {
    appendProducts({
      is_active: "",
      product: "",
      is_product_active: "",
      custom_values: [{ id: "", object: "", values: { x: "", y: "", z: "" } }], // Initialize with at least one custom value
      product_key: "",
    });
  };

  const addSequenceRow = () => {
    appendSequence({
      sequence_id: "",
      shots: [
        {
          shot_id: "",
          is_first_shot: "",
          previous_shot: "",
          shot_controls: {
            duration: "",
            repeat: "",
            repeat_forever: "",
            back_to_start: "",
            easing_function: "",
            easing_type: "",
          },
          action: [
            {
              action_id: "",
              action_object_type: "",
              action_type: "",
              action_property: "",
              action_values: { x: "", y: "", z: "" },
            },
          ],
        },
      ],
    });
  };

  // Form submit handler
  const onSubmit = (data) => {
    console.log("payload", data);

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
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={3}>
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

          {/* Viewport Section */}
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

                  {viewportFields.map((field, index) => (
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
                          {viewportFields.length > 1 && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="outlined"
                                size="small"
                                onClick={() => removeViewport(index)}
                                style={{
                                  backgroundColor: DeleteColor,
                                  color: TextColor,
                                }}
                              >
                                Remove
                              </Button>
                            </Grid>
                          )}
                          {viewportFields.length - 1 === index && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="contained"
                                onClick={addViewportRow}
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

          {/* Controls Section */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Controls</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  {/* Table Header */}
                  <TableRow>
                    <TableCell>Control ID</TableCell>
                    <TableCell>Is Control Active</TableCell>
                    <TableCell>Default Value</TableCell>
                    <TableCell>{/* Action Buttons */}</TableCell>
                  </TableRow>

                  {controlFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <TextField
                          id={`controls.${index}.control_id`}
                          {...register(`controls.${index}.control_id`)}
                          defaultValue={field.control_id}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`controls.${index}.is_control_active`}
                          {...register(`controls.${index}.is_control_active`)}
                          defaultValue={field.is_control_active}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`controls.${index}.default_value`}
                          {...register(`controls.${index}.default_value`)}
                          defaultValue={field.default_value}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <Grid container justifyContent="flex-end" spacing={1}>
                          {controlFields.length > 1 && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="outlined"
                                size="small"
                                onClick={() => removeControl(index)}
                                style={{
                                  backgroundColor: DeleteColor,
                                  color: TextColor,
                                }}
                              >
                                Remove
                              </Button>
                            </Grid>
                          )}
                          {controlFields.length - 1 === index && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="contained"
                                onClick={addControlRow}
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

          {/* Cameras Section */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Cameras</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  {/* Table Header */}
                  <TableRow>
                    <TableCell>Camera Id</TableCell>
                    <TableCell>Camera Type</TableCell>
                    <TableCell>Camera Fov</TableCell>
                    <TableCell>Camera Near</TableCell>
                    <TableCell>Camera Far</TableCell>
                    <TableCell>Camera Position</TableCell>
                    <TableCell>Camera is default</TableCell>
                    <TableCell>{/* Action Buttons */}</TableCell>
                  </TableRow>

                  {camerasFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <TextField
                          id={`cameras.${index}.camera_id`}
                          {...register(`cameras.${index}.camera_id`)}
                          defaultValue={field.camera_id}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`cameras.${index}.camera_type`}
                          {...register(`cameras.${index}.camera_type`)}
                          defaultValue={field.camera_type}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`cameras.${index}.camera_fov`}
                          {...register(`cameras.${index}.camera_fov`)}
                          defaultValue={field.camera_fov}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`cameras.${index}.camera_near`}
                          {...register(`cameras.${index}.camera_near`)}
                          defaultValue={field.camera_near}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`cameras.${index}.camera_far`}
                          {...register(`cameras.${index}.camera_far`)}
                          defaultValue={field.camera_far}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`cameras.${index}.camera_position`}
                          {...register(`cameras.${index}.camera_position`)}
                          defaultValue={field.camera_position}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={`cameras.${index}.is_default`}
                          {...register(`cameras.${index}.is_default`)}
                          defaultValue={field.is_default}
                          errors={errors}
                        />
                      </TableCell>
                      <TableCell>
                        <Grid container justifyContent="flex-end" spacing={1}>
                          {camerasFields.length > 1 && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="outlined"
                                size="small"
                                onClick={() => removeCameras(index)}
                                style={{
                                  backgroundColor: DeleteColor,
                                  color: TextColor,
                                }}
                              >
                                Remove
                              </Button>
                            </Grid>
                          )}
                          {camerasFields.length - 1 === index && (
                            <Grid item>
                              <Button
                                type="button"
                                variant="contained"
                                onClick={addCameraRow}
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

          {/* Orbit Control */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Orbit Control</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <CustomPaper variant="outlined">
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Dropdown
                    id="enabled"
                    label="Enabled"
                    placeholder="Select"
                    control={control}
                    selectObj={booleanList}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Dropdown
                    id="auto_rotate"
                    label="Auto Rotate"
                    placeholder="Select"
                    control={control}
                    selectObj={booleanList}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Dropdown
                    id="enable_pan"
                    label="Enable Pan"
                    placeholder="Select"
                    control={control}
                    selectObj={booleanList}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Dropdown
                    id="enable_rotate"
                    label="Enable Rotate"
                    placeholder="Select"
                    control={control}
                    selectObj={booleanList}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Dropdown
                    id="enable_zoom"
                    label="Enable Zoom"
                    placeholder="Select"
                    control={control}
                    selectObj={booleanList}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="max_azimuth_angle"
                    placeholder="Enter Max Azimuth Angle"
                    label="Max Azimuth Angle"
                    isRequired={true}
                    {...register("max_azimuth_angle")}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="min_azimuth_angle"
                    placeholder="Enter Min Azimuth Angle"
                    label="Min Azimuth Angle"
                    isRequired={true}
                    {...register("min_azimuth_angle")}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="max_polar_angle"
                    placeholder="Enter max polar angle"
                    label="Max Polar Angle"
                    isRequired={true}
                    {...register("max_polar_angle")}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="min_polar_angle"
                    placeholder="Enter min polar angle"
                    label="Min Polar Angle"
                    isRequired={true}
                    {...register("min_polar_angle")}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="min_zoom"
                    placeholder="Enter min zoom"
                    label="Min Zoom"
                    isRequired={true}
                    {...register("min_zoom")}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="max_zoom"
                    placeholder="Enter max zoom"
                    label="Max Zoom"
                    isRequired={true}
                    {...register("max_zoom")}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="target"
                    placeholder="Enter target x,y,z format"
                    label="Target"
                    isRequired={true}
                    {...register("target")}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </CustomPaper>
          </Box>

          {/* Products Control */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Products</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <CustomPaper variant="outlined">
              <Box style={{ padding: "8px", width: "100%" }}>
                {productsFields.map((field, index) => (
                  <Grid container spacing={1} key={field.id}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`products.${index}.is_active`}
                        label="Is Active"
                        defaultValue={field.is_active}
                        isRequired={true}
                        {...register(`products.${index}.is_active`)}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`products.${index}.product`}
                        label="Product"
                        defaultValue={field.product}
                        isRequired={true}
                        {...register(`products.${index}.product`)}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`products.${index}.is_product_active`}
                        label="Is Product Active"
                        defaultValue={field.is_product_active}
                        isRequired={true}
                        {...register(`products.${index}.is_product_active`)}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`products.${index}.product_key`}
                        label="Product Key"
                        defaultValue={field.product_key}
                        isRequired={true}
                        {...register(`products.${index}.product_key`)}
                        errors={errors}
                      />
                    </Grid>

                    <Box mt={2}>
                      {/* <Typography variant="subtitle1">Custom Values</Typography> */}
                      <CustomValuesForm
                        control={control}
                        productIndex={index}
                        register={register}
                        errors={errors}
                      />
                    </Box>

                    {/* Add/Remove Buttons aligned to the right */}
                    <Grid item xs={12}>
                      <Grid container justifyContent="flex-end" spacing={2}>
                        {/* Remove Button - Only show if there's more than one row */}
                        {productsFields.length !== 1 && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="outlined"
                              size="small"
                              onClick={() => removeProducts(index)}
                              style={{
                                backgroundColor: DeleteColor,
                                color: TextColor,
                              }}
                            >
                              Remove
                            </Button>
                          </Grid>
                        )}

                        {/* Add Button only on the last row */}
                        {productsFields.length - 1 === index && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="contained"
                              onClick={addProductRow}
                              size="small"
                              style={{ backgroundColor: PrimaryColor }}
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
            </CustomPaper>
          </Box>
          {/* end */}

          {/* sequences control */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Sequence</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <CustomPaper variant="outlined">
              <Box style={{ padding: "8px", width: "100%" }}>
                {sequenceFields.map((field, index) => (
                  <Grid container spacing={1} key={field.id}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id={`sequences.${index}.sequence_id`}
                        label="Sequence Id"
                        defaultValue={field.sequence_id}
                        isRequired={true}
                        {...register(`sequences.${index}.sequence_id`)}
                        errors={errors}
                      />
                    </Grid>

                    <Box
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                      }}
                    >
                      <SequenceValuesForm
                        control={control}
                        productIndex={index}
                        register={register}
                        errors={errors}
                      />
                    </Box>

                    {/* Add/Remove Buttons aligned to the right */}
                    <Grid item xs={12}>
                      <Grid container justifyContent="flex-end" spacing={2}>
                        {/* Remove Button - Only show if there's more than one row */}
                        {sequenceFields.length !== 1 && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="outlined"
                              size="small"
                              onClick={() => removeSequence(index)}
                              style={{
                                backgroundColor: DeleteColor,
                                color: TextColor,
                              }}
                            >
                              Remove
                            </Button>
                          </Grid>
                        )}

                        {/* Add Button only on the last row */}
                        {sequenceFields.length - 1 === index && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="contained"
                              onClick={addSequenceRow}
                              size="small"
                              style={{ backgroundColor: PrimaryColor }}
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
            </CustomPaper>
          </Box>
          {/* end */}

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

const CustomValuesForm = ({ control, productIndex, register, errors }) => {
  // Field array for dynamic custom_values
  const {
    fields: customValuesFields,
    append: appendCustomValue,
    remove: removeCustomValue,
  } = useFieldArray({
    control,
    name: `products.${productIndex}.custom_values`,
  });

  // Function to add a new custom value row
  const addCustomValueRow = () => {
    appendCustomValue({
      id: "",
      object: "",
      values: { x: "", y: "", z: "" },
    });
  };
  console.log("customValuesFields11", customValuesFields, productIndex);
  return (
    // <Box mt={2}>
    //   {customValuesFields.map((customValueField, customValueIndex) => (
    //     <Grid container spacing={2} key={customValueField.id}>
    //       <Grid item xs={12} md={3}>
    //         <TextField
    //           label="ID"
    //           defaultValue={customValueField.id}
    //           {...register(
    //             `products.${productIndex}.custom_values.${customValueIndex}.id`
    //           )}
    //           errors={errors}
    //           fullWidth
    //         />
    //       </Grid>
    //       <Grid item xs={12} md={3}>
    //         <TextField
    //           label="Object"
    //           defaultValue={customValueField.object}
    //           {...register(
    //             `products.${productIndex}.custom_values.${customValueIndex}.object`
    //           )}
    //           errors={errors}
    //           fullWidth
    //         />
    //       </Grid>
    //       <Grid item xs={12} md={2}>
    //         <TextField
    //           label="X"
    //           defaultValue={customValueField.values.x}
    //           {...register(
    //             `products.${productIndex}.custom_values.${customValueIndex}.values.x`
    //           )}
    //           errors={errors}
    //           fullWidth
    //         />
    //       </Grid>
    //       <Grid item xs={12} md={2}>
    //         <TextField
    //           label="Y"
    //           defaultValue={customValueField.values.y}
    //           {...register(
    //             `products.${productIndex}.custom_values.${customValueIndex}.values.y`
    //           )}
    //           errors={errors}
    //           fullWidth
    //         />
    //       </Grid>
    //       <Grid item xs={12} md={2}>
    //         <TextField
    //           label="Z"
    //           defaultValue={customValueField.values.z}
    //           {...register(
    //             `products.${productIndex}.custom_values.${customValueIndex}.values.z`
    //           )}
    //           errors={errors}
    //           fullWidth
    //         />
    //       </Grid>

    //       {/* Add/Remove buttons for custom values */}
    //       <Grid item xs={12}>
    //         <Grid container justifyContent="flex-end" spacing={2}>
    //           {/* Remove Custom Value Button */}
    //           {customValuesFields.length > 1 && (
    //             <Grid item>
    //               <Button
    //                 variant="outlined"
    //                 color="secondary"
    //                 onClick={() => removeCustomValue(customValueIndex)}
    //               >
    //                 Remove Custom Value
    //               </Button>
    //             </Grid>
    //           )}

    //           {/* Add Custom Value Button */}
    //           {customValueIndex === customValuesFields.length - 1 && (
    //             <Grid item>
    //               <Button variant="contained" onClick={addCustomValueRow}>
    //                 Add Custom Value
    //               </Button>
    //             </Grid>
    //           )}
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   ))}
    // </Box>
    <Box mt={3}>
      <CustomPaper variant="outlined">
        <CustomTypographyForTitle>
          <Typography
            variant="subtitle2"
            style={{ fontWeight: "550", fontSize: "16px" }}
          >
            Custom Values
          </Typography>
        </CustomTypographyForTitle>
      </CustomPaper>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableBody>
            {/* Table Header */}
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Object</TableCell>
              <TableCell>X</TableCell>
              <TableCell>Y</TableCell>
              <TableCell>Z</TableCell>
              <TableCell>{/* Action Buttons */}</TableCell>
            </TableRow>

            {customValuesFields.map((customValueField, customValueIndex) => (
              <TableRow key={customValueField.id}>
                <TableCell>
                  <TextField
                    // label="ID"
                    defaultValue={customValueField.id}
                    {...register(
                      `products.${productIndex}.custom_values.${customValueIndex}.id`
                    )}
                    errors={errors}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    // label="Object"
                    defaultValue={customValueField.object}
                    {...register(
                      `products.${productIndex}.custom_values.${customValueIndex}.object`
                    )}
                    errors={errors}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    // label="X"
                    defaultValue={customValueField.values.x}
                    {...register(
                      `products.${productIndex}.custom_values.${customValueIndex}.values.x`
                    )}
                    errors={errors}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    // label="Y"
                    defaultValue={customValueField.values.y}
                    {...register(
                      `products.${productIndex}.custom_values.${customValueIndex}.values.y`
                    )}
                    errors={errors}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    // label="Z"
                    defaultValue={customValueField.values.z}
                    {...register(
                      `products.${productIndex}.custom_values.${customValueIndex}.values.z`
                    )}
                    errors={errors}
                  />
                </TableCell>

                {/* Add/Remove buttons for custom values */}
                <TableCell>
                  <Grid container justifyContent="flex-end" spacing={2}>
                    {customValuesFields.length > 1 && (
                      <Grid item>
                        <Button
                          variant="outlined"
                          style={{
                            backgroundColor: DeleteColor,
                            color: TextColor,
                          }}
                          size="small"
                          onClick={() => removeCustomValue(customValueIndex)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                    {customValueIndex === customValuesFields.length - 1 && (
                      <Grid item>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={addCustomValueRow}
                          style={{
                            backgroundColor: PrimaryColor,
                            color: TextColor,
                          }}
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
  );
};

const SequenceValuesForm = ({ control, productIndex, register, errors }) => {
  // Field array for dynamic custom_values
  const {
    fields: customValuesFields,
    append: appendCustomValue,
    remove: removeCustomValue,
  } = useFieldArray({
    control,
    name: `sequences.${productIndex}.shots`,
  });

  // Function to add a new custom value row
  const addCustomValueRow = () => {
    appendCustomValue({
      shots: [
        {
          shot_id: "",
          is_first_shot: "",
          previous_shot: "",
          shot_controls: {
            duration: "",
            repeat: "",
            repeat_forever: "",
            back_to_start: "",
            easing_function: "",
            easing_type: "",
          },
          action: [
            {
              action_id: "",
              action_object_type: "",
              action_type: "",
              action_property: "",
              action_values: { x: "", y: "", z: "" },
            },
          ],
        },
      ],
    });
  };

  console.log("customValuesFields11", customValuesFields, productIndex);
  return (
    <Box mt={2}>
      {customValuesFields.map((customValueField, customValueIndex) => (
        <>
          <Grid container spacing={2} key={customValueField.id}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Shot Id"
                defaultValue={customValueField.shot_id}
                {...register(
                  `sequences.${productIndex}.shots.${customValueIndex}.shot_id`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Is First Shot"
                defaultValue={customValueField.is_first_shot}
                {...register(
                  `sequences.${productIndex}.shots.${customValueIndex}.is_first_shot`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Previous Shot"
                defaultValue={customValueField.previous_shot}
                {...register(
                  `sequences.${productIndex}.shots.${customValueIndex}.previous_shot`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
          </Grid>
          <CustomPaper
            style={{ boxSizing: "border-box", border: "1px solid green" }}
          >
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Shot Controls</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Duration"
                  defaultValue={customValueField.shot_controls?.duration}
                  {...register(
                    `sequences.${productIndex}.shots.${customValueIndex}.shot_controls.duration`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Repeat Forever"
                  defaultValue={customValueField.shot_controls?.repeat_forever}
                  {...register(
                    `sequences.${productIndex}.shots.${customValueIndex}.shot_controls.repeat_forever`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Repeat"
                  defaultValue={customValueField.shot_controls?.repeat}
                  {...register(
                    `sequences.${productIndex}.shots.${customValueIndex}.shot_controls.repeat`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Back To Start"
                  defaultValue={customValueField.shot_controls?.back_to_start}
                  {...register(
                    `sequences.${productIndex}.shots.${customValueIndex}.shot_controls.back_to_start`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Easing Function"
                  defaultValue={customValueField.shot_controls?.easing_function}
                  {...register(
                    `sequences.${productIndex}.shots.${customValueIndex}.shot_controls.easing_function`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Easing Type"
                  defaultValue={customValueField.shot_controls?.easing_type}
                  {...register(
                    `sequences.${productIndex}.shots.${customValueIndex}.shot_controls.easing_type`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CustomPaper>
        </>
      ))}
    </Box>
  );
};
export default ExperienceForm;
