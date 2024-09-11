import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";

export const SequenceForm = ({ control, register, productIndex, errors }) => {
  // Field array for dynamic sequences
  const {
    fields: sequenceFields,
    append: appendSequence,
    remove: removeSequence,
  } = useFieldArray({
    control,
    name: `products.${productIndex}.sequences`,
  });

  // Function to add a new sequence row
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

  // Initialize with one row by default if no sequences exist
  useEffect(() => {
    if (sequenceFields.length === 0) {
      addSequenceRow();
    }
  }, [sequenceFields, addSequenceRow]);

  return (
    <Box mt={3}>
      {sequenceFields.map((sequenceField, sequenceIndex) => (
        <Paper key={sequenceField.id} elevation={3} sx={{ padding: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Sequence {sequenceIndex + 1}</Typography>
            </Grid>

            {/* Sequence ID */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sequence ID"
                fullWidth
                {...register(
                  `products.${productIndex}.sequences.${sequenceIndex}.sequence_id`
                )}
                error={
                  !!errors?.products?.[productIndex]?.sequences?.[sequenceIndex]
                    ?.sequence_id
                }
                helperText={
                  errors?.products?.[productIndex]?.sequences?.[sequenceIndex]
                    ?.sequence_id?.message
                }
              />
            </Grid>

            {/* Shots */}
            {sequenceField.shots.map((shot, shotIndex) => (
              <React.Fragment key={shotIndex}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Shot {shotIndex + 1}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Shot ID"
                    fullWidth
                    {...register(
                      `products.${productIndex}.sequences.${sequenceIndex}.shots.${shotIndex}.shot_id`
                    )}
                    error={
                      !!errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.shot_id
                    }
                    helperText={
                      errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.shot_id?.message
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Is First Shot"
                    fullWidth
                    {...register(
                      `products.${productIndex}.sequences.${sequenceIndex}.shots.${shotIndex}.is_first_shot`
                    )}
                    error={
                      !!errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.is_first_shot
                    }
                    helperText={
                      errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.is_first_shot?.message
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Previous Shot"
                    fullWidth
                    {...register(
                      `products.${productIndex}.sequences.${sequenceIndex}.shots.${shotIndex}.previous_shot`
                    )}
                    error={
                      !!errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.previous_shot
                    }
                    helperText={
                      errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.previous_shot?.message
                    }
                  />
                </Grid>

                {/* Shot Controls */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Shot Controls</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Duration"
                    fullWidth
                    {...register(
                      `products.${productIndex}.sequences.${sequenceIndex}.shots.${shotIndex}.shot_controls.duration`
                    )}
                    error={
                      !!errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.shot_controls?.duration
                    }
                    helperText={
                      errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.shot_controls?.duration?.message
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Repeat"
                    fullWidth
                    {...register(
                      `products.${productIndex}.sequences.${sequenceIndex}.shots.${shotIndex}.shot_controls.repeat`
                    )}
                    error={
                      !!errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.shot_controls?.repeat
                    }
                    helperText={
                      errors?.products?.[productIndex]?.sequences?.[
                        sequenceIndex
                      ]?.shots?.[shotIndex]?.shot_controls?.repeat?.message
                    }
                  />
                </Grid>
                {/* Add other Shot Controls fields similarly */}

                {/* Actions */}
                {shot.action.map((action, actionIndex) => (
                  <React.Fragment key={actionIndex}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Action {actionIndex + 1}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Action ID"
                        fullWidth
                        {...register(
                          `products.${productIndex}.sequences.${sequenceIndex}.shots.${shotIndex}.action.${actionIndex}.action_id`
                        )}
                        error={
                          !!errors?.products?.[productIndex]?.sequences?.[
                            sequenceIndex
                          ]?.shots?.[shotIndex]?.action?.[actionIndex]
                            ?.action_id
                        }
                        helperText={
                          errors?.products?.[productIndex]?.sequences?.[
                            sequenceIndex
                          ]?.shots?.[shotIndex]?.action?.[actionIndex]
                            ?.action_id?.message
                        }
                      />
                    </Grid>
                    {/* Add other Action fields similarly */}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}

            {/* Add/Remove buttons for sequences */}
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" spacing={2}>
                {sequenceFields.length > 1 && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => removeSequence(sequenceIndex)}
                    >
                      Remove Sequence
                    </Button>
                  </Grid>
                )}
                {sequenceIndex === sequenceFields.length - 1 && (
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={addSequenceRow}
                    >
                      Add Sequence
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default SequenceForm;
