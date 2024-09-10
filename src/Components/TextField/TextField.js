import React, { forwardRef } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import { CustomLabel, TextInput } from "./style";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getNestedErrorMessage } from "../../Utils/HelperFunctions/ErrorFunction";

const TextField = forwardRef(
  (
    {
      blockDetails,
      editDetails,
      id,
      label,
      required,
      onChange,
      onFocus,
      onBlur,
      name,
      value,
      error,
      disabled,
      type = "text",
      defaultValue,
      isRequired,
      onEdit,
      icon,
      labelStyle,
      noFocusChange,
      proposalRead,
      fontSize,
      themeType,
      readOnly,
      testId,
      capitalize,
      disableMarginTop,
      description,
      errors,
      watch,
      numberToWord = false,
      Width,
      minHeight,
      borderNone,
      endAddornmentText,
      onKeyDown,
      disableOnPaste,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const errorMessage = getNestedErrorMessage(errors, name);

    const handleInputChange = (e) => {
      let value = e.target.value;
      e.target.value = capitalize
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
      onChange?.(e);
    };

    return (
      <InputContainer Width={Width} minHeight={minHeight}>
        {label && (
          <CustomLabel htmlFor={id} title={label}>
            {label}
            {isRequired && <span className="required"> *</span>}
            {description && !proposalRead && (
              <Tooltip title={description} arrow placement="top">
                <InfoOutlinedIcon
                  sx={{
                    fontSize: "12px",
                    marginLeft: "3px",
                    position: "relative",
                    top: "2px",
                  }}
                />
              </Tooltip>
            )}
          </CustomLabel>
        )}
        <div style={{ position: "relative" }}>
          <TextInput
            {...rest}
            ref={ref}
            name={name}
            type={type}
            disabled={disabled}
            required={required}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            id={id}
            onFocus={onFocus}
            defaultValue={defaultValue}
            value={value}
            error={errorMessage}
            readOnly={readOnly}
            proposalRead={proposalRead}
            data-testid={testId}
            onPaste={(e) => (disableOnPaste ? e.preventDefault() : undefined)}
          />
          {icon && (
            <i
              className={icon}
              style={{
                position: "absolute",
                top: "50%",
                right: "35px",
                transform: "translateY(-50%)",
                fontSize: fontSize ? `calc(15px + ${fontSize - 92}%)` : "15px",
                cursor: "pointer",
              }}
              onClick={() => {
                onEdit?.();
              }}
            ></i>
          )}
          {/* Tooltip for the full error message */}
          <Tooltip title={errorMessage || ""} arrow placement="bottom">
            <ErrorWrapper>
              {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
            </ErrorWrapper>
          </Tooltip>
        </div>
      </InputContainer>
    );
  }
);

export default TextField;

const InputContainer = styled.div`
  position: relative;
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "32px")};
  width: ${({ Width }) => (Width ? `${Width}px` : "100%")};
  margin-bottom: 24px; /* Space to accommodate the error message */
`;

const ErrorWrapper = styled.div`
  position: absolute;
  bottom: -25px; /* Adjust this value based on the font size of your error message */
  left: 0;
  width: 100%;
  color: red;
  font-size: 12px;
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Show ellipsis when text overflows */
  white-space: nowrap; /* Prevent text from wrapping to the next line */
`;
