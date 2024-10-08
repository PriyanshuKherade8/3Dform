import { Box, styled, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export const CustomPaper = styled(Paper)(() => ({
  width: "100%",
  // height: "100%",
  padding: "10px",
  // border: "1px solid red",
  boxSizing: "border-box",
  backgroundColor: "white",
  marginBottom: "15px",
}));

export const CustomTypographyForTitle = styled(Typography)(() => ({
  fontSize: "20px",
  marginBottom: "6px",
  textTransform: "capitalize",
}));

export const CustomLayout = styled(Box)(() => ({
  // padding: "15px",
}));

export const PrimaryColor = "#16325B";
export const DeleteColor = "#A04747";
export const TextColor = "#F5F5F5";
