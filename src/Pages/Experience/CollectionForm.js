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
                <Typography variant="h6">property</Typography>
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
        </div>
      ))}
    </Box>
  );
};
