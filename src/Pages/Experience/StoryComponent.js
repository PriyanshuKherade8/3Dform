import { Button, Grid } from "@mui/material";
import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  DeleteColor,
  PrimaryColor,
  TextColor,
} from "../../Styles/GlobalStyles/GlobalStyles";
import TextField from "../../Components/TextField/TextField";

const StoryComponent = ({ control, storyIndex, register }) => {
  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    control,
    name: `stories.${storyIndex}.chapters`,
  });

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
    >
      <h3>Story {storyIndex + 1}</h3>
      {chapterFields.map((chapter, chapterIndex) => (
        <div
          key={chapter.id}
          style={{
            margin: "20px 0",
            border: "1px solid #eee",
            padding: "10px",
          }}
        >
          <h4>Chapter {chapterIndex + 1}</h4>
          {chapterFields.length > 1 && (
            <Button
              style={{
                backgroundColor: DeleteColor,
                color: TextColor,
              }}
              onClick={() => removeChapter(chapterIndex)}
            >
              Remove Chapter
            </Button>
          )}
          <Grid container spacing={2} key={chapter.id}>
            <Grid item xs={12} md={3}>
              <TextField
                label={"Chapter id"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.chapter_id`
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={"Display Title"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.display_title`
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={"Display Text"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.display_text`
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={"Is Default"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.is_default`
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={"Is First Chapter"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.is_first_chapter`
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={"Previous Chapter"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.previous_chapter`
                )}
                fullWidth
              />
            </Grid>
          </Grid>
          {/* Sequences Field Array */}
          <SequencesComponent
            control={control}
            storyIndex={storyIndex}
            chapterIndex={chapterIndex}
            register={register}
          />
        </div>
      ))}
      <Button
        style={{
          backgroundColor: PrimaryColor,
          color: TextColor,
        }}
        onClick={() =>
          appendChapter({
            chapter_id: "",
            display_title: "",
            sequences: [
              { sequence_id: "", is_first_sequence: "", previous_sequence: "" },
            ],
          })
        }
      >
        Add Chapter
      </Button>
    </div>
  );
};

// Separate component for sequences
const SequencesComponent = ({
  control,
  storyIndex,
  chapterIndex,
  register,
}) => {
  const {
    fields: sequenceFields,
    append: appendSequence,
    remove: removeSequence,
  } = useFieldArray({
    control,
    name: `stories.${storyIndex}.chapters.${chapterIndex}.sequences`,
  });

  return (
    <div>
      <h5>Sequences</h5>
      {sequenceFields.map((sequence, sequenceIndex) => (
        <div key={sequence.id}>
          {sequenceFields.length > 1 && (
            <Button
              style={{
                backgroundColor: DeleteColor,
                color: TextColor,
              }}
              onClick={() => removeSequence(sequenceIndex)}
            >
              Remove Sequence
            </Button>
          )}
          <Grid container spacing={2} key={sequence.id}>
            <Grid item xs={12} md={4}>
              <TextField
                label={"Sequence Id"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.sequences.${sequenceIndex}.sequence_id`
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label={"Is First Sequence"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.sequences.${sequenceIndex}.is_first_sequence`
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label={"Previous Sequence"}
                {...register(
                  `stories.${storyIndex}.chapters.${chapterIndex}.sequences.${sequenceIndex}.previous_sequence`
                )}
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
      ))}
      <Button
        style={{
          backgroundColor: PrimaryColor,
          color: TextColor,
        }}
        onClick={() =>
          appendSequence({
            sequence_id: "",
            is_first_sequence: "",
            previous_sequence: "",
          })
        }
      >
        Add Sequence
      </Button>
    </div>
  );
};

export default StoryComponent;
