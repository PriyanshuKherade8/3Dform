import React from "react";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Tooltip } from "@mui/material";

const Textarea = React.forwardRef(
  (
    {
      label,
      id,
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      isRequired,
      disabled,
      placeholder,
      readOnly,
      errors,
      error,
      proposalRead,
      watch,
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(errors?.[name]);
    const errorMessage = errors?.[name]?.message;

    return (
      <TextareaContainer>
        {label && (
          <CustomLabel htmlFor={id}>
            {label}
            {isRequired && !proposalRead && (
              <span className="required"> *</span>
            )}
          </CustomLabel>
        )}
        {proposalRead ? null : (
          <StyledTextarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            isRequired={isRequired}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={ref}
            error={hasError}
            {...rest}
          />
        )}
        {hasError && (
          <ErrorWrapper>
            <Tooltip title={errorMessage} placement="top" arrow>
              <span>{errorMessage}</span>
            </Tooltip>
          </ErrorWrapper>
        )}
      </TextareaContainer>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

const TextareaContainer = styled.div`
  position: relative;
  margin-bottom: 40px; /* Ensure space for error message */
`;

const StyledTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  padding: 10px;
  font-size: 14px;
  font-family: system-ui;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #A9A7A7")};
  border-radius: 4px;
  resize: vertical;
  &:focus {
    outline: none;
    border: 1px solid
      ${({ error, theme }) => (error ? "red" : `${theme.primaryColor}`)};
  }
  &:disabled {
    background-color: #f7f7f7;
  }
`;

export const CustomLabel = styled.label`
  color: ${({ theme }) =>
    theme.primaryColor ? `${theme.primaryColor} !important` : "rgb(0,0,0)"};
  padding-left: 1px;
  font-size: 14px;
  font-family: system-ui;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
`;

const ErrorWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: red;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
