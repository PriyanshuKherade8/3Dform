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
      errors, // contains the errors for form fields
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
    // Use the utility function to get error messages dynamically
    const errorMessage = getNestedErrorMessage(errors, name);

    const handleInputChange = (e) => {
      let value = e.target.value;
      e.target.value = capitalize
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
      onChange?.(e); // Call onChange if provided
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
        {proposalRead ? null : (
          <div
            style={{
              position: "relative",
            }}
          >
            <TextInput
              {...rest}
              ref={ref} // Attach ref to the input element
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
              error={errorMessage} // Pass the error message directly to the input
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
                  top: "30px",
                  right: "35px",
                  fontSize: fontSize
                    ? `calc(15px + ${fontSize - 92}%)`
                    : "15px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onEdit?.();
                }}
              ></i>
            )}
            {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
          </div>
        )}
      </InputContainer>
    );
  }
);

export default TextField;

const InputContainer = styled.div`
  position: relative;
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "32px")};
  width: ${({ Width }) => (Width ? `${Width}px` : "100%")};
`;
