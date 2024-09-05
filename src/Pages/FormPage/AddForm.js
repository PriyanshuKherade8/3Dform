import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";

import Dropdown from "../../Components/Dropdown/Dropdown";
import Textarea from "../../Components/TextArea/TextArea";
import TextField from "../../Components/TextField/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const CustomCard = styled(Card)({
  width: "60%",
  margin: "auto",
  // padding: "8px",
});

const schema = yup.object().shape({
  ticket_id: yup.string().required("Ticket ID is required"),
  // ticketnum: yup.string().required("Ticket Number is required"),
  queryTitle: yup.string().required("Query Title is required"),
  queryDescription: yup.string().required("Query Description is required"),
  transactionStage: yup.mixed().required("Transaction Stage is required"),
});

export default function AddForm() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      ticket_id: "",
      // transactionStage: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert("submitted");
    console.log("em", data); // Handle form submission data here
  };

  console.log("errors", errors);

  const arrayone = [
    { label: "xyz", value: 1 },
    { label: "abc", value: 2 },
    { label: "xyz", value: 3 },
    { label: "abc", value: 4 },
    { label: "xyz", value: 5 },
    { label: "abc", value: 6 },
    { label: "xyz", value: 7 },
    { label: "abc", value: 8 },
  ];
  return (
    <CustomCard variant="outlined">
      <CardHeader
        title={<Typography variant="h6">All components</Typography>}
      />

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                id="ticket_id"
                placeholder="Enter Ticket ID"
                label="Ticket ID"
                isRequired={true}
                {...register("ticket_id")}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Dropdown
                maxMenuHeight={200}
                id="transactionStage"
                placeholder="Select"
                // isMulti={true}
                label="Transaction Stage"
                isRequired={true}
                control={control}
                selectObj={arrayone}
                errors={errors}
                onInput={true}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="ticketnum"
                name="ticketnum"
                placeholder="Enter Ticket Number"
                label="Ticket Number 1"
                isRequired={false}
                {...register("ticketnum")}
                errors={errors}
              />
            </Grid>

            <Grid item lg={12} md={12} xs={12} sm={12}>
              <Textarea
                label="Query Title"
                id="queryTitle"
                name="queryTitle"
                {...register("queryTitle")}
                placeholder="Enter your query title here..."
                errors={errors}
                isRequired={true}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12} sm={12}>
              <Textarea
                label="Query Description"
                id="queryDescription"
                name="queryDescription"
                {...register("queryDescription")}
                placeholder="Enter your query description here..."
                errors={errors}
                isRequired={true}
              />
            </Grid>
          </Grid>

          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              Submit Ticket
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </CustomCard>
  );
}
