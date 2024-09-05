import styled from "styled-components";

export const Label = styled.label`
  transition: all 0.3s;
  cursor: ${(props) => (props.blockDetails ? "not-allowed" : "text")};
  pointer-events: ${(props) =>
    (props.blockDetails || props.readOnly) && "none"};
  top: ${(props) => (props.userViewInput ? "-30px" : "-22px")};
  left: ${(props) => (props.userViewInput ? "12px" : "3px")};
  font-family: ${({ theme }) =>
    theme?.regularFont ? theme?.regularFont : "sans-serif"};
  color: ${({ theme, themeType }) =>
    themeType && theme ? theme?.[themeType]?.inputLabel : "#11555F"};
  color: ${(props) => props.userViewInput && "#000"};
  line-height: 18px;
  font-size: ${({ theme: { fontSize } }) =>
    fontSize ? `calc(1rem + ${fontSize - 92}%)` : "12px"};
    font-weight: 500;
  & > span {
    font-size: ${({ theme: { fontSize } }) =>
      fontSize ? `calc(1.5rem + ${fontSize - 92}%)` : "1.5rem"};
  }
  .info {
    color: red;
    font-size: 12px;
    z-index: 1;
    position: relative;
    top: 1px;
  }
  }
`;

export const TextInput = styled.input`
  box-sizing: border-box;
  min-height: ${(props) => (props.userViewInput ? "40px" : "32px")};
  margin-bottom: ${(props) => props.userViewInput && "20px"};
  cursor: text;
  width: 100%;
  border-radius: 4px;
  transition: all 0.15s linear;
  // min-width: 180px;
  outline: none;
  color: #000000;
  padding: ${(props) => (props.proposalRead ? "0" : "0 8px")};
  font-size: ${({ theme: { fontSize } }) =>
    fontSize ? `calc(1rem + ${fontSize - 92}%)` : "12px"};
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #A9A7A7")};
  background-color: ${(props) => props.readOnly && "#E2E2E2"};
  background: ${(props) => props.proposalRead && "#fff"};
  cursor: ${(props) => props.blockDetails && "not-allowed"};
  pointer-events: ${(props) =>
    (props.blockDetails || props.proposalRead || props.readOnly) && "none"};
  font-weight: ${(props) => props.proposalRead && "700"};
  font-size: ${(props) => props.proposalRead && "14px"};
  margin-top: ${(props) => props.proposalRead && "0"};
  margin-left: ${(props) => props.proposalRead && "3px"};
  border: ${(props) => props.proposalRead && "0"};
  text-align: left;
  &:focus {
    outline: none;
    border: 1px solid
      ${({ error, theme }) => (error ? "red" : `${theme.primaryColor}`)};
  }
  ::placeholder {
    font-size: ${({ theme: { fontSize } }) =>
      fontSize ? `calc(15px + ${fontSize - 92}%)` : "12px"};
    opacity: 0.5;
    letter-spacing: 0.5px;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    /* Firefox */
  }
  @media (max-width: 767px) {
    min-width: 195px;
    max-width: inherit;
  }
  @media (max-width: 450px) {
    min-width: 195px;
    max-width: inherit;
  }
`;

export const CustomLabel = styled.label`
  color: ${({ theme }) =>
    theme.primaryColor ? `${theme.primaryColor} !important` : "rgb(0, 0, 0)"};
  font-size: 15px;
  font-family: system-ui;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
`;

export const DatePickerWrapper = styled.div`
  min-height: 75px;
  .MuiInputBase-root {
    font-size: 12px;
    height: 32px;
    background-color: ${(props) => (props.readOnly ? "#E2E2E2" : "white")};
    pointer-events: ${({ proposalRead }) => proposalRead && "none"};
    border: ${({ proposalRead, errorMessage }) =>
      !proposalRead && errorMessage
        ? "1px solid red"
        : !proposalRead && "1px solid rgb(169, 167, 167)"};
    fieldset {
      border: none;
    }
  }

  .MuiFormControl-root {
    width: 100%;
    & input {
      padding: 5px;
      background-color: ${(props) => props.readOnly && "#E2E2E2"};
      color: ${({ proposalRead }) => (proposalRead ? "black" : "")};
      font-weight: ${({ proposalRead }) => proposalRead && "bold"};
      font-size: ${({ proposalRead }) => (proposalRead ? "14px" : "12px")};
      cursor: default;
    }
    button {
      display: ${({ proposalRead }) => proposalRead && "none"};
    }
  }
`;
