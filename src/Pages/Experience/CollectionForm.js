import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomPaper,
  CustomTypographyForTitle,
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import TextField from "../../Components/TextField/TextField";

export const CollectionValuesForm = ({
  productIndex,
  control,
  errors,
  register,
  useFieldArray,
}) => {
  // Field array for dynamic custom_values (shots)
  const {
    fields: customValuesFields,
    append: appendCustomValue,
    remove: removeCustomValue,
  } = useFieldArray({
    control,
    name: `collections.${productIndex}.items`,
  });

  const addItemRow = () => {
    appendCustomValue({
      item_id: "",
      is_first_item: "",
      item_display_short_title: "",
      item_display_long_title: "",
      item_icons: [
        {
          file_type: "",
          path: "",
        },
      ],
      property: [
        {
          property_id: "",
        },
      ],
      interactions: [],
      views: [
        {
          view_id: "",
          view_name: "",
          is_default: "",
          view_icons: [
            {
              file_type: "",
              path: "",
            },
          ],
          sequences: [
            {
              sequence_id: "",
              is_first_sequence: "",
              previous_sequence: "", // Corrected to match spelling
            },
          ],
        },
      ],
      product_key: "",
    });
  };

  // Field array for dynamic actions within each shot
  const ActionFields = ({
    control,
    register,
    errors,
    actionFields,
    shotIndex,
  }) => {
    const {
      fields: actionFieldsList,
      append: appendAction,
      remove: removeAction,
    } = useFieldArray({
      control,
      name: `collections.${productIndex}.items.${shotIndex}.item_icons`,
    });

    const addActionRow = () => {
      appendAction({
        file_type: "",
        path: "",
      });
    };

    return (
      <>
        {actionFieldsList.map((actionField, actionIndex) => (
          <Grid container spacing={2} key={actionField.id}>
            <Grid item xs={12} md={3}>
              <TextField
                label="File Type"
                defaultValue={actionField.file_type}
                {...register(
                  `collections.${productIndex}.items.${shotIndex}.item_icons.${actionIndex}.file_type`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Path"
                defaultValue={actionField.path}
                {...register(
                  `collections.${productIndex}.items.${shotIndex}.item_icons.${actionIndex}.path`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "flex-end",
                }}
              >
                {actionFieldsList.length !== 1 && (
                  <Grid item>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: DeleteColor,
                        color: TextColor,
                      }}
                      onClick={() => removeAction(actionIndex)}
                    >
                      Remove Item icons
                    </Button>
                  </Grid>
                )}
                {actionFieldsList.length - 1 === actionIndex && (
                  <Grid item>
                    <Button
                      size="small"
                      onClick={addActionRow}
                      style={{
                        backgroundColor: PrimaryColor,
                        color: TextColor,
                      }}
                    >
                      Add Item icons
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </>
    );
  };

  const PropertyFields = ({
    control,
    register,
    errors,
    actionFields,
    shotIndex,
  }) => {
    const {
      fields: propertyFieldsList,
      append: appendPropertyAction,
      remove: removePropertyAction,
    } = useFieldArray({
      control,
      name: `collections.${productIndex}.items.${shotIndex}.property`,
    });

    const addPropertyRow = () => {
      appendPropertyAction({
        property_id: "",
      });
    };

    return (
      <>
        {propertyFieldsList.map((actionField, actionIndex) => (
          <Grid container spacing={2} key={actionField.id}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Property Id"
                defaultValue={actionField.property_id}
                {...register(
                  `collections.${productIndex}.items.${shotIndex}.property.${actionIndex}.property_id`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "flex-end",
                }}
              >
                {propertyFieldsList.length !== 1 && (
                  <Grid item>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: DeleteColor,
                        color: TextColor,
                      }}
                      onClick={() => removePropertyAction(actionIndex)}
                    >
                      Remove Property
                    </Button>
                  </Grid>
                )}
                {propertyFieldsList.length - 1 === actionIndex && (
                  <Grid item>
                    <Button
                      size="small"
                      onClick={addPropertyRow}
                      style={{
                        backgroundColor: PrimaryColor,
                        color: TextColor,
                      }}
                    >
                      Add Property
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </>
    );
  };

  const ViewFields = ({ control, register, errors, shotIndex }) => {
    const {
      fields: viewFieldsList,
      append: appendViewAction,
      remove: removeViewAction,
    } = useFieldArray({
      control,
      name: `collections.${productIndex}.items.${shotIndex}.views`,
      defaultValues: [
        {
          view_id: "",
          view_name: "",
          is_default: "",
          view_icons: [{ file_type: "", path: "" }],
          sequences: [
            { sequence_id: "", is_first_sequence: "", previous_sequence: "" },
          ],
        },
      ],
    });

    const addViewRow = () => {
      appendViewAction({
        view_id: "",
        view_name: "",
        is_default: "",
        view_icons: [{ file_type: "", path: "" }], // default one view_icon
        sequences: [
          { sequence_id: "", is_first_sequence: "", previous_sequence: "" },
        ], // default one sequence
      });
    };

    // Nested component to handle view_icons
    const ViewIconFields = ({ control, register, errors, viewIndex }) => {
      const {
        fields: viewIconsList,
        append: appendViewIcon,
        remove: removeViewIcon,
      } = useFieldArray({
        control,
        name: `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.view_icons`,
        defaultValues: [{ file_type: "", path: "" }], // default one view_icon
      });

      const addViewIconRow = () => appendViewIcon({ file_type: "", path: "" });

      return (
        <>
          {viewIconsList.map((viewIconField, viewIconIndex) => (
            <Grid container spacing={2} key={viewIconField.id}>
              <Grid item xs={4}>
                <TextField
                  label="File Type"
                  defaultValue={viewIconField.file_type}
                  {...register(
                    `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.view_icons.${viewIconIndex}.file_type`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Path"
                  defaultValue={viewIconField.path}
                  {...register(
                    `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.view_icons.${viewIconIndex}.path`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>

              {/* Conditionally show remove button if more than one row */}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  paddingTop: "16px",
                  marginLeft: "15px",
                }}
              >
                {viewIconsList.length > 1 && (
                  <Grid item>
                    <Button
                      onClick={() => removeViewIcon(viewIconIndex)}
                      style={{ backgroundColor: DeleteColor, color: TextColor }}
                    >
                      Remove Icon
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    onClick={addViewIconRow}
                    style={{ backgroundColor: PrimaryColor, color: TextColor }}
                  >
                    Add View Icon
                  </Button>
                </Grid>
              </Box>
            </Grid>
          ))}
        </>
      );
    };

    // Nested component to handle sequences
    const SequenceFields = ({ control, register, errors, viewIndex }) => {
      const {
        fields: sequenceList,
        append: appendSequence,
        remove: removeSequence,
      } = useFieldArray({
        control,
        name: `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.sequences`,
        defaultValues: [
          { sequence_id: "", is_first_sequence: "", previous_sequence: "" },
        ], // default one sequence
      });

      const addSequenceRow = () =>
        appendSequence({
          sequence_id: "",
          is_first_sequence: "",
          previous_sequence: "",
        });

      return (
        <>
          {sequenceList.map((sequenceField, sequenceIndex) => (
            <Grid container spacing={2} key={sequenceField.id}>
              <Grid item xs={3}>
                <TextField
                  label="Sequence Id"
                  defaultValue={sequenceField.sequence_id}
                  {...register(
                    `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.sequences.${sequenceIndex}.sequence_id`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Is First Sequence"
                  defaultValue={sequenceField.is_first_sequence}
                  {...register(
                    `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.sequences.${sequenceIndex}.is_first_sequence`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Previous Sequence"
                  defaultValue={sequenceField.previous_sequence}
                  {...register(
                    `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.sequences.${sequenceIndex}.previous_sequence`
                  )}
                  errors={errors}
                  fullWidth
                />
              </Grid>

              {/* Conditionally show remove button if more than one row */}

              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  paddingTop: "16px",
                  marginLeft: "15px",
                }}
              >
                {sequenceList.length > 1 && (
                  <Grid item>
                    <Button
                      onClick={() => removeSequence(sequenceIndex)}
                      style={{ backgroundColor: DeleteColor, color: TextColor }}
                    >
                      Remove Sequence
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    onClick={addSequenceRow}
                    style={{ backgroundColor: PrimaryColor, color: TextColor }}
                  >
                    Add Sequence
                  </Button>
                </Grid>
              </Box>
            </Grid>
          ))}
        </>
      );
    };

    return (
      <>
        {viewFieldsList.map((actionField, viewIndex) => (
          <Grid container spacing={2} key={actionField.id}>
            <Grid item xs={3}>
              <TextField
                label="View Id"
                defaultValue={actionField.view_id}
                {...register(
                  `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.view_id`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="View Name"
                defaultValue={actionField.view_name}
                {...register(
                  `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.view_name`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Is Default"
                defaultValue={actionField.is_default}
                {...register(
                  `collections.${productIndex}.items.${shotIndex}.views.${viewIndex}.is_default`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>

            {/* View Icons Section */}
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">View Icons</Typography>
              </CustomTypographyForTitle>
              <ViewIconFields
                control={control}
                register={register}
                errors={errors}
                viewIndex={viewIndex}
              />
            </CustomPaper>

            {/* Sequences Section */}
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Sequences</Typography>
              </CustomTypographyForTitle>
              <SequenceFields
                control={control}
                register={register}
                errors={errors}
                viewIndex={viewIndex}
              />
            </CustomPaper>

            {/* Conditionally show remove view button if more than one row */}
            <Box
              style={{
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={1}
                style={{ justifyContent: "flex-end", gap: "20px" }}
              >
                {viewFieldsList.length > 1 && (
                  <Button
                    onClick={() => removeViewAction(viewIndex)}
                    style={{ backgroundColor: DeleteColor, color: TextColor }}
                  >
                    Remove View
                  </Button>
                )}

                <Button
                  onClick={addViewRow}
                  style={{ backgroundColor: PrimaryColor, color: TextColor }}
                >
                  Add View
                </Button>
              </Grid>
            </Box>
          </Grid>
        ))}
      </>
    );
  };

  return (
    <Box mt={2}>
      {customValuesFields.map((customValueField, customValueIndex) => (
        <div key={customValueField.id}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Item Id"
                defaultValue={customValueField.item_id}
                {...register(
                  `collections.${productIndex}.items.${customValueIndex}.item_id`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Is First Item"
                defaultValue={customValueField.is_first_item}
                {...register(
                  `collections.${productIndex}.items.${customValueIndex}.is_first_item`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Display Short Title"
                defaultValue={customValueField.item_display_short_title}
                {...register(
                  `collections.${productIndex}.items.${customValueIndex}.item_display_short_title`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Display Long Title"
                defaultValue={customValueField.item_display_long_title}
                {...register(
                  `collections.${productIndex}.items.${customValueIndex}.item_display_long_title`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Product Key"
                defaultValue={customValueField.product_key}
                {...register(
                  `collections.${productIndex}.items.${customValueIndex}.product_key`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
          </Grid>

          <CustomPaper>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Item Icons</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <ActionFields
              control={control}
              register={register}
              errors={errors}
              actionFields={customValueField.action}
              shotIndex={customValueIndex}
            />
          </CustomPaper>

          <CustomPaper>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Property</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <PropertyFields
              control={control}
              register={register}
              errors={errors}
              actionFields={customValueField.action}
              shotIndex={customValueIndex}
            />
          </CustomPaper>

          <CustomPaper>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Views</Typography>
              </CustomTypographyForTitle>
            </CustomPaper>
            <ViewFields
              control={control}
              register={register}
              errors={errors}
              actionFields={customValueField.action}
              shotIndex={customValueIndex}
            />
          </CustomPaper>

          {/* Add/remove buttons */}
          <Box
            mt={2}
            style={{
              border: "1px solid red",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: PrimaryColor }}
              onClick={addItemRow}
            >
              Add Item
            </Button>
            <Button
              variant="outlined"
              style={{
                backgroundColor: DeleteColor,
                color: TextColor,
              }}
              onClick={() => removeCustomValue(customValueIndex)} // Remove current item
              sx={{ ml: 2 }}
            >
              Remove Item
            </Button>
          </Box>
        </div>
      ))}
    </Box>
  );
};
