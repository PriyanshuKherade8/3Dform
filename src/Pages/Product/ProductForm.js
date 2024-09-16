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
import { useFieldArray, useForm } from "react-hook-form";
import TextField from "../../Components/TextField/TextField";
import { PropertyForm } from "./PropertyForm";
import { useAddProductData } from "./ProductServices";
import { useGetModelListData } from "../ModelPage/ModelServices";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useGetVariantListData } from "../Variant/VariantServices";

const ProductForm = () => {
  const { id } = useParams();
  const { data: modelData, error, isLoading } = useGetModelListData();

  const modelList = modelData?.data?.modelList?.map((item) => {
    return {
      label: item?.model_name,
      value: item?.id,
    };
  });

  const { data: variantData } = useGetVariantListData();
  const variantList = variantData?.data?.variantList?.map((item) => {
    return {
      label: item?.variant_name,
      value: item?.id,
    };
  });

  const initialComponent = [
    {
      component_id: "",
      model: "",
      link_id: "",
      default_settings: [],
      default_variants: [],
    },
  ];

  const initialDimensions = [
    {
      dimension_id: "",
      link_id: "",
      object_link_id: "",
      is_line: "",
      line_color: "",
      line_scale: "",
      line_offset: "",
      width: "",
      height: "",
      is_border: "",
      border_width: "",
      border_color: "",
      is_background: "",
      background_color: "",
      font_type: "",
      font_color: "",
      values: [{ key: "", value: "" }],
    },
  ];

  const initialProperty = [
    {
      property_id: "",
      property_name: "",
      property_type: "",
      is_active: "",
      is_player_config: "",
      display_name: "",
      link_id: [{ link_id: "" }],
      variants: [
        {
          variant_id: "",
          is_active: "",
          is_default: "",
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
    defaultValues: {
      components: initialComponent,
      dimensions: initialDimensions,
      property: initialProperty,
    },
  });

  // Field array for dynamic component fields
  const {
    fields: viewComponentFields,
    append: appendComponent,
    remove: removeComponent,
  } = useFieldArray({
    control,
    name: "components",
  });

  const {
    fields: dimensionsFields,
    append: appendDimensions,
    remove: removeDimensions,
  } = useFieldArray({
    control,
    name: "dimensions",
  });

  const {
    fields: propertyFields,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    control,
    name: "property",
  });

  // Add new row function for components
  const addComponentRow = () => {
    appendComponent({
      component_id: "",
      model: "",
      link_id: "",
      default_settings: [],
      default_variants: [],
    });
  };

  const addDimensionsRow = () => {
    appendDimensions({
      dimension_id: "",
      link_id: "",
      object_link_id: "",
      is_line: "",
      line_color: "",
      line_scale: "",
      line_offset: "",
      width: "",
      height: "",
      is_border: "",
      border_width: "",
      border_color: "",
      is_background: "",
      background_color: "",
      font_type: "",
      font_color: "",

      values: [{ key: "", value: "" }],
    });
  };

  const addPropertyRow = () => {
    appendProperty({
      property_id: "",
      property_name: "",
      property_type: "",
      is_active: "",
      is_player_config: "",
      display_name: "",
      link_id: [{ link_id: "" }],
      variants: [
        {
          variant_id: "",
          is_active: "",
          is_default: "",
        },
      ],
    });
  };

  const { mutate: addProduct } = useAddProductData();
  const onSubmit = (data) => {
    const { dimensions, property, components, ...restOfData } = data;

    const transformedDimensions = dimensions.map((dim) => ({
      ...dim,
      is_line: dim.is_line === "true",
      is_border: dim.is_border === "true",
      is_background: dim.is_background === "true",
      values: dim.values.map((v) => ({
        key: v.key,
        value: v.value,
      })),
    }));

    // Transform components so that model only contains the id
    const transformedComponents = components?.map((component) => ({
      ...component,
      model: component.model.id,
    }));

    // Transform the property link_id to only contain values
    const transformedProperties = property.map((prop) => ({
      ...prop,
      link_id: prop.link_id.map((link) => link),
      variants: prop.variants.map((variant) => ({
        ...variant,
        variant_id: variant.variant_id.value,
      })),
    }));

    const addPayload = {
      product_item: {
        ...restOfData,
        dimensions: transformedDimensions,
        property: transformedProperties,
        components: transformedComponents,
      },
    };

    console.log("payloadProduct", addPayload);
    addProduct(addPayload);
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
                label="User ID"
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
                          label={""}
                        />
                      </TableCell>
                      <TableCell>
                        {/* <TextField
                          id={`components.${index}.model`}
                          {...register(`components.${index}.model`)}
                          defaultValue={field.model}
                          errors={errors}
                        /> */}

                        <Dropdown
                          id={`components.${index}.model`}
                          placeholder="Select"
                          control={control}
                          selectObj={modelList}
                          errors={errors}
                          onInput={true}
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
          {/* Dimension Section */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Dimensions</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <CustomPaper variant="outlined">
              <Box style={{ padding: "8px", width: "100%" }}>
                {dimensionsFields.map((field, index) => (
                  <Grid container spacing={1} key={field.id}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.dimension_id`}
                        label="Dimension Id"
                        defaultValue={field.dimension_id}
                        isRequired={true}
                        {...register(`dimensions.${index}.dimension_id`)}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.link_id`}
                        label="Link ID"
                        defaultValue={field.link_id}
                        isRequired={true}
                        {...register(`dimensions.${index}.link_id`)}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.object_link_id`}
                        label="Object Link ID"
                        defaultValue={field.object_link_id}
                        isRequired={true}
                        {...register(`dimensions.${index}.object_link_id`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.is_line`}
                        label="Is Line"
                        defaultValue={field.is_line}
                        isRequired={true}
                        {...register(`dimensions.${index}.is_line`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.line_color`}
                        label="Line Color"
                        defaultValue={field.line_color}
                        isRequired={true}
                        {...register(`dimensions.${index}.line_color`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.line_scale`}
                        label="Line Scale"
                        defaultValue={field.line_scale}
                        isRequired={true}
                        {...register(`dimensions.${index}.line_scale`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.line_offset`}
                        label="Line Offset"
                        defaultValue={field.line_offset}
                        isRequired={true}
                        {...register(`dimensions.${index}.line_offset`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.width`}
                        label="Width"
                        defaultValue={field.width}
                        isRequired={true}
                        {...register(`dimensions.${index}.width`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.height`}
                        label="Height"
                        defaultValue={field.height}
                        isRequired={true}
                        {...register(`dimensions.${index}.height`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.is_border`}
                        label="Is Border"
                        defaultValue={field.is_border}
                        isRequired={true}
                        {...register(`dimensions.${index}.is_border`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.border_width`}
                        label="Border Width"
                        defaultValue={field.border_width}
                        isRequired={true}
                        {...register(`dimensions.${index}.border_width`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.border_color`}
                        label="Border Color"
                        defaultValue={field.border_color}
                        isRequired={true}
                        {...register(`dimensions.${index}.border_color`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.is_background`}
                        label="Is Background"
                        defaultValue={field.is_background}
                        isRequired={true}
                        {...register(`dimensions.${index}.is_background`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.background_color`}
                        label="Background Color"
                        defaultValue={field.background_color}
                        isRequired={true}
                        {...register(`dimensions.${index}.background_color`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.font_type`}
                        label="Font Type"
                        defaultValue={field.font_type}
                        isRequired={true}
                        {...register(`dimensions.${index}.font_type`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`dimensions.${index}.font_color`}
                        label="Font Color"
                        defaultValue={field.font_color}
                        isRequired={true}
                        {...register(`dimensions.${index}.font_color`)}
                        errors={errors}
                      />
                    </Grid>

                    <Box mt={2}>
                      <CustomValuesForm
                        index={index}
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
                        {dimensionsFields.length !== 1 && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="outlined"
                              size="small"
                              onClick={() => removeDimensions(index)}
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
                        {dimensionsFields.length - 1 === index && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="contained"
                              onClick={addDimensionsRow}
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

          {/* Property Section */}
          <Box mt={3}>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Property</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <CustomPaper variant="outlined">
              <Box style={{ padding: "8px", width: "100%" }}>
                {propertyFields.map((field, index) => (
                  <Grid container spacing={1} key={field.id}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`property.${index}.property_id`}
                        label="Property Id"
                        defaultValue={field.property_id}
                        isRequired={true}
                        {...register(`property.${index}.property_id`)}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`property.${index}.property_name`}
                        label="Property Name"
                        defaultValue={field.property_name}
                        isRequired={true}
                        {...register(`property.${index}.property_name`)}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`property.${index}.property_type`}
                        label="Property Type"
                        defaultValue={field.property_type}
                        isRequired={true}
                        {...register(`property.${index}.property_type`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`property.${index}.is_active`}
                        label="Is Active"
                        defaultValue={field.is_active}
                        isRequired={true}
                        {...register(`property.${index}.is_active`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`property.${index}.is_player_config`}
                        label="Is Player Config"
                        defaultValue={field.is_player_config}
                        isRequired={true}
                        {...register(`property.${index}.is_player_config`)}
                        errors={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        id={`property.${index}.display_name`}
                        label="Display Name"
                        defaultValue={field.display_name}
                        isRequired={true}
                        {...register(`property.${index}.display_name`)}
                        errors={errors}
                      />
                    </Grid>

                    <Box
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                      }}
                    >
                      <PropertyForm
                        control={control}
                        productIndex={index}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        useFieldArray={useFieldArray}
                      />
                    </Box>

                    {/* Add/Remove Buttons aligned to the right */}
                    <Grid item xs={12}>
                      <Grid container justifyContent="flex-end" spacing={2}>
                        {propertyFields.length !== 1 && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="outlined"
                              size="small"
                              onClick={() => removeProperty(index)}
                              style={{
                                backgroundColor: DeleteColor,
                                color: TextColor,
                              }}
                            >
                              Remove Property
                            </Button>
                          </Grid>
                        )}

                        {propertyFields.length - 1 === index && (
                          <Grid item>
                            <Button
                              type="button"
                              variant="contained"
                              onClick={addPropertyRow}
                              size="small"
                              style={{ backgroundColor: PrimaryColor }}
                            >
                              Add Property
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
          {/* button section */}
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

const CustomValuesForm = ({ index, control, register, errors }) => {
  const {
    fields: customValuesFields,
    append: appendCustomValue,
    remove: removeCustomValue,
  } = useFieldArray({
    control,
    name: `dimensions.${index}.values`,
  });

  const addCustomValueRow = () => {
    appendCustomValue({ key: "", value: "" });
  };

  return (
    <Box>
      <CustomPaper variant="outlined">
        <Typography variant="h6">Custom Values</Typography>
      </CustomPaper>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>{/* Action Buttons */}</TableCell>
            </TableRow>

            {customValuesFields.map((field, fieldIndex) => (
              <TableRow key={field.id}>
                <TableCell>
                  <TextField
                    id={`dimensions.${index}.values.${fieldIndex}.key`}
                    defaultValue={field.key}
                    isRequired={true}
                    {...register(
                      `dimensions.${index}.values.${fieldIndex}.key`
                    )}
                    errors={errors}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id={`dimensions.${index}.values.${fieldIndex}.value`}
                    defaultValue={field.value}
                    isRequired={true}
                    {...register(
                      `dimensions.${index}.values.${fieldIndex}.value`
                    )}
                    errors={errors}
                  />
                </TableCell>
                <TableCell>
                  <Grid container justifyContent="flex-end" spacing={1}>
                    {customValuesFields.length > 1 && (
                      <Grid item>
                        <Button
                          type="button"
                          variant="outlined"
                          size="small"
                          onClick={() => removeCustomValue(fieldIndex)}
                          style={{
                            backgroundColor: DeleteColor,
                            color: TextColor,
                          }}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                    {customValuesFields.length - 1 === fieldIndex && (
                      <Grid item>
                        <Button
                          type="button"
                          variant="contained"
                          onClick={addCustomValueRow}
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
  );
};

export default ProductForm;
