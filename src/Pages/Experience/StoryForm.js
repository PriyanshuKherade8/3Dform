import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import TextField from "../../Components/TextField/TextField";
import {
  CustomPaper,
  CustomTypographyForTitle,
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";

const StoryForm = ({
  control,
  errors,
  register,
  useFieldArray,
  productIndex,
  setValue,
  getValues,
}) => {
  // Field array for Stories
  const {
    fields: StoriesFields,
    append: appendStories,
    remove: removeStories,
  } = useFieldArray({
    control,
    name: "stories", // Stories level
  });

  // Function to add a new Story
  const addStoryRow = () => {
    appendStories({
      story_id: "",
      is_active: "",
      story_display_title: "",
      chapters: [
        {
          chapter_id: "",
          is_first_chapter: "",
          previous_chapter: [""],
          is_default: "",
          display_title: "",
          display_text: "",
          sequences: [
            {
              sequence_id: "",
              is_first_sequence: "",
              previous_sequence: "",
            },
          ],
        },
      ],
    });
  };

  // Field array for Chapters within each Story
  const ChapterFields = ({ storyIndex }) => {
    const {
      fields: chapterFields,
      append: appendChapter,
      remove: removeChapter,
    } = useFieldArray({
      control,
      name: `stories.${storyIndex}.chapters`, // Chapters level for a specific story
    });

    const addChapterRow = () => {
      appendChapter({
        chapter_id: "",
        is_first_chapter: "",
        previous_chapter: [""],
        is_default: "",
        display_title: "",
        display_text: "",
        sequences: [
          {
            sequence_id: "",
            is_first_sequence: "",
            previous_sequence: "",
          },
        ],
      });
    };
    console.log("chapterFields", chapterFields);
    console.log("StoriesFields", StoriesFields);

    return (
      <>
        {/* <CustomPaper variant="outlined">
          <CustomTypographyForTitle>
            <Typography variant="h6">Chapter</Typography>
          </CustomTypographyForTitle>
        </CustomPaper> */}
        {chapterFields.map((chapterField, chapterIndex) => (
          <Grid
            container
            spacing={2}
            key={chapterField.id}
            style={{ border: "1px solid red" }}
          >
            <Grid item xs={12} md={2}>
              <TextField
                label="Chapter ID"
                // defaultValue={chapterField.chapter_id || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.chapter_id`
                )} // Correct chapter path
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Is First Chapter"
                defaultValue={chapterField.is_first_chapter || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.is_first_chapter`
                )} // Correct display title path
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Is Previous Chapter"
                defaultValue={chapterField.previous_chapter || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.previous_chapter`
                )} // Correct display title path
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Is Default"
                defaultValue={chapterField.is_default || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.is_default`
                )} // Correct display title path
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Display Title"
                defaultValue={chapterField.display_title || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.display_title`
                )} // Correct display title path
                errors={errors}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Display Text"
                defaultValue={chapterField.display_text || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.display_text`
                )} // Correct display title path
                errors={errors}
                fullWidth
              />
            </Grid>
            {/* Sequence fields for this chapter */}
            <Grid item xs={12} md={12}>
              <SequenceFields
                storyIndex={storyIndex}
                chapterIndex={chapterIndex}
              />
            </Grid>

            {/* Add/Remove Buttons for Chapter */}
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
                {chapterFields.length !== 1 && (
                  <Grid item>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: DeleteColor,
                        color: TextColor,
                      }}
                      onClick={() => removeChapter(chapterIndex)}
                    >
                      Remove Chapter
                    </Button>
                  </Grid>
                )}
                {chapterFields.length - 1 === chapterIndex && (
                  <Grid item>
                    <Button
                      size="small"
                      onClick={addChapterRow}
                      style={{
                        backgroundColor: PrimaryColor,
                        color: TextColor,
                      }}
                    >
                      Add Chapter
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

  // Field array for Sequences within each Chapter
  const SequenceFields = ({ storyIndex, chapterIndex }) => {
    const {
      fields: sequenceFields,
      append: appendSequence,
      remove: removeSequence,
    } = useFieldArray({
      control,
      name: `stories.${storyIndex}.chapters.${chapterIndex}.sequences`, // Sequences level for a specific chapter
    });

    const addSequenceRow = () => {
      appendSequence({
        sequence_id: "",
        is_first_sequence: "",
        previous_sequence: "",
      });
    };

    return (
      <>
        {/* <CustomPaper variant="outlined">
          <CustomTypographyForTitle>
            <Typography variant="h6">Sequence</Typography>
          </CustomTypographyForTitle>
        </CustomPaper> */}
        {sequenceFields.map((sequenceField, sequenceIndex) => (
          <Grid container spacing={2} key={sequenceField.id}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Sequence ID"
                defaultValue={sequenceField.sequence_id || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.sequences.${sequenceIndex}.sequence_id`
                )} // Correct sequence path
                errors={errors}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Is First Sequence"
                defaultValue={sequenceField.is_first_sequence || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.sequences.${sequenceIndex}.is_first_sequence`
                )} // Correct sequence path
                errors={errors}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Previous Sequence"
                defaultValue={sequenceField.previous_sequence || ""}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.sequences.${sequenceIndex}.previous_sequence`
                )} // Correct sequence path
                errors={errors}
                fullWidth
              />
            </Grid>

            {/* Add/Remove Buttons for Sequences */}
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
                {sequenceFields.length !== 1 && (
                  <Grid item>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: DeleteColor,
                        color: TextColor,
                      }}
                      onClick={() => removeSequence(sequenceIndex)}
                    >
                      Remove Sequence
                    </Button>
                  </Grid>
                )}
                {sequenceFields.length - 1 === sequenceIndex && (
                  <Grid item>
                    <Button
                      size="small"
                      onClick={addSequenceRow}
                      style={{
                        backgroundColor: PrimaryColor,
                        color: TextColor,
                      }}
                    >
                      Add Sequence
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

  console.log("StoriesFields123---------", StoriesFields);
  return (
    <Box mt={2}>
      {StoriesFields.map((storyField, storyIndex) => (
        <div key={storyField.id}>
          <CustomPaper>
            {/* Render Chapter Fields */}
            <ChapterFields storyIndex={storyIndex} />
          </CustomPaper>
        </div>
      ))}

      {/* Add new Story */}
      <Button
        size="small"
        onClick={addStoryRow}
        style={{ backgroundColor: PrimaryColor, color: TextColor }}
      >
        Add Story-test
      </Button>
    </Box>
  );
};

export default StoryForm;
