import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomPaper,
  CustomTypographyForTitle,
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import TextField from "../../Components/TextField/TextField";

export const SequenceValuesForm = ({
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
    name: `sequences.${productIndex}.shots`,
  });

  const addCustomValueRow = () => {
    appendCustomValue({
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
          action_clip_in_reverse: "",
          action_type: "",
          action_property: "",
          action_values: { x: "", y: "", z: "" },
        },
      ],
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
      name: `sequences.${productIndex}.shots.${shotIndex}.action`,
    });

    const addActionRow = () => {
      appendAction({
        action_id: "",
        action_object_type: "",
        action_clip_in_reverse: "",
        action_type: "",
        action_property: "",
        action_values: { x: "", y: "", z: "" },
      });
    };

    return (
      <>
        {actionFieldsList.map((actionField, actionIndex) => (
          <Grid container spacing={2} key={actionField.id}>
            <Grid item xs={12} md={2}>
              <TextField
                label="Action ID"
                defaultValue={actionField.action_id}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_id`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Object Type"
                defaultValue={actionField.action_object_type}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_object_type`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Action Clip In Reverse"
                defaultValue={actionField.action_clip_in_reverse}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_clip_in_reverse`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Action Type"
                defaultValue={actionField.action_type}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_type`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Action Property"
                defaultValue={actionField.action_property}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_property`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="X"
                defaultValue={actionField.action_values?.x}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_values.x`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Y"
                defaultValue={actionField.action_values?.y}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_values.y`
                )}
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Z"
                defaultValue={actionField.action_values?.z}
                {...register(
                  `sequences.${productIndex}.shots.${shotIndex}.action.${actionIndex}.action_values.z`
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
                      Remove Action
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
                      Add Action
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
          <CustomPaper>
            <CustomPaper variant="outlined">
              <CustomTypographyForTitle>
                <Typography variant="h6">Actions</Typography>
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
        </div>
      ))}
    </Box>
  );
};
