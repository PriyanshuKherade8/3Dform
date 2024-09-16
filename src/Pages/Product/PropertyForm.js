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
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useGetVariantListData } from "../Variant/VariantServices";
import { useEffect } from "react";

export const PropertyForm = ({
  productIndex,
  control,
  errors,
  register,
  setValue,
  productDataToSet,
  id,
}) => {
  const { data: variantData } = useGetVariantListData();
  const variantList = variantData?.data?.variantList?.map((item) => {
    return {
      label: item?.variant_name,
      value: item?.id,
    };
  });

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

  useEffect(() => {
    if (
      productDataToSet?.property &&
      productDataToSet?.property.length > 0 &&
      !!id
    ) {
      productDataToSet?.property?.forEach((property, index) => {
        // Set value for property fields
        setValue(`property.${index}.property_id`, property.property_id);
        setValue(`property.${index}.property_name`, property.property_name);
        setValue(`property.${index}.property_type`, property.property_type);
        setValue(`property.${index}.is_active`, property.is_active);
        setValue(
          `property.${index}.is_player_config`,
          property.is_player_config
        );
        setValue(`property.${index}.display_name`, property.display_name);

        // Handle link_id array
        if (property.link_id && property.link_id.length > 0) {
          property.link_id.forEach((link, linkIndex) => {
            if (linkIndex === 0) {
              setValue(`property.${index}.link_id`, property.link_id);
            }
          });
        }

        // Handle variants array
        if (property.variants && property.variants.length > 0) {
          property.variants.forEach((variant, variantIndex) => {
            console.log("variant111", variant);
            const transformedVariant = {
              ...variant,
              variant_id: {
                label: variant.variant_id, // Assuming variant.model contains the correct label
                value: variant.variant_id,
              },
            };

            if (variantIndex === 0) {
              // For the first variant, set the value directly
              setValue(`property.${index}.variants`, [transformedVariant]);
            } else {
              // For subsequent variants, append them
              appendProperty(transformedVariant);
            }
          });
        }
      });
    }
  }, [productDataToSet, appendLinkId, appendProperty, id, setValue]);

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
            {/* <TextField
              label="Variant Id"
              {...register(
                `property.${productIndex}.variants.${propertyIndex}.variant_id`
              )}
              errors={errors}
              fullWidth
            /> */}
            <Dropdown
              label={"Variant Id"}
              maxMenuHeight={200}
              id={`property.${productIndex}.variants.${propertyIndex}.variant_id`}
              placeholder="Select"
              isRequired={true}
              control={control}
              selectObj={variantList}
              errors={errors}
              onInput={true}
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
                    Remove Variants
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
                    Add Variants
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
