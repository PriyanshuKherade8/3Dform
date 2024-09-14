import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomPaper,
  CustomTypographyForTitle,
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import TextField from "../../Components/TextField/TextField";
import { useFieldArray, useForm } from "react-hook-form";

export const PropertyForm = ({ productIndex, control, errors, register }) => {
  const {
    fields: linkIdFields,
    append: appendLinkId,
    remove: removeLinkId,
  } = useFieldArray({
    control,
    name: `property.${productIndex}.link_id`,
  });

  const {
    fields: propertyFieldsList,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    control,
    name: `property.${productIndex}.variants`,
  });

  const addLinkIdRow = () => {
    appendLinkId({ link_id: "" });
  };

  const removeLinkIdRow = (index) => {
    removeLinkId(index);
  };

  const addPropertyRow = () => {
    appendProperty({
      variant_id: "",
      is_active: "",
      is_default: "",
    });
  };

  const LinkIdFields = () => (
    <>
      {linkIdFields.length > 0 && (
        <CustomPaper>
          {linkIdFields.map((linkIdField, linkIdIndex) => (
            <Grid container spacing={2} key={linkIdField.id}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Link Id"
                  {...register(
                    `property.${productIndex}.link_id.${linkIdIndex}.link_id`
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
                  {linkIdFields.length > 1 && (
                    <Grid item>
                      <Button
                        size="small"
                        style={{
                          backgroundColor: DeleteColor,
                          color: TextColor,
                        }}
                        onClick={() => removeLinkIdRow(linkIdIndex)}
                      >
                        Remove Link Id
                      </Button>
                    </Grid>
                  )}
                  {linkIdFields.length - 1 === linkIdIndex && (
                    <Grid item>
                      <Button
                        size="small"
                        onClick={addLinkIdRow}
                        style={{
                          backgroundColor: PrimaryColor,
                          color: TextColor,
                        }}
                      >
                        Add Link Id
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </CustomPaper>
      )}
    </>
  );

  const PropertyFields = () => (
    <>
      {propertyFieldsList.map((propertyField, propertyIndex) => (
        <Grid container spacing={2} key={propertyField.id}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Variant Id"
              {...register(
                `property.${productIndex}.variants.${propertyIndex}.variant_id`
              )}
              errors={errors}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Is Active"
              {...register(
                `property.${productIndex}.variants.${propertyIndex}.is_active`
              )}
              errors={errors}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Is Default"
              {...register(
                `property.${productIndex}.variants.${propertyIndex}.is_default`
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
              {propertyFieldsList.length > 1 && (
                <Grid item>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: DeleteColor,
                      color: TextColor,
                    }}
                    onClick={() => removeProperty(propertyIndex)}
                  >
                    Remove Property
                  </Button>
                </Grid>
              )}
              {propertyFieldsList.length - 1 === propertyIndex && (
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

  return (
    <Box mt={2}>
      <CustomPaper>
        <CustomPaper variant="outlined">
          <CustomTypographyForTitle>
            <Typography variant="h6">Link Ids</Typography>
          </CustomTypographyForTitle>
        </CustomPaper>
        <LinkIdFields />
      </CustomPaper>

      <CustomPaper>
        <CustomPaper variant="outlined">
          <CustomTypographyForTitle>
            <Typography variant="h6">Variants</Typography>
          </CustomTypographyForTitle>
        </CustomPaper>
        <PropertyFields />
      </CustomPaper>
    </Box>
  );
};
