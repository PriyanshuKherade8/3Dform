import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import Select, { components as selectComponents } from "react-select";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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

const InputContainer = styled.div`
  position: relative;
  width: ${({ Width }) => (Width ? `${Width}px` : "100%")};
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "auto")};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? "24px" : "0"}; /* Space for error message */
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

function Dropdown({
  id,
  label,
  placeholder = "Select",
  selectObj,
  isRequired,
  control,
  isMulti,
  isLoading,
  closeMenuOnSelect,
  maxMenuHeight,
  proposalRead,
  components,
  marginBottom,
  isDisabled,
  noOptionMessage,
  description,
  onChange,
  errors,
  onInput,
  isClearable,
  watch,
  reset,
  setValue,
  smartSearchEndpoint,
  register,
  fieldId,
  minHeight,
  Width,
  brokerDataShuffle,
  onInputChange,
  dropDownInputValue,
  setScrolledToBottom,
  flag,
  setDistrictDropDownData,
  menuPortalTarget,
}) {
  const selectRef = useRef();
  const [inputFocus, setInputFocus] = useState(false);
  const borderColor = errors?.[id]
    ? "1px solid red"
    : "1px solid rgb(169, 167, 167)";
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDisabled ? "#E2E2E2" : "white",
      width: "100%",
      border: state.isFocused ? borderColor : borderColor,
      borderRadius: brokerDataShuffle ? "50px" : "4px",
      background: brokerDataShuffle ? "transparent" : "",
      fontSize: "13px",
      minHeight: 32,
      maxHeight: isMulti ? 80 : 34,
      boxShadow: state.isFocused ? "0 0 0 0.2rem transparent" : "none",
      padding: brokerDataShuffle ? "0 10px" : "0 5px",
      cursor: "pointer",
      "&:hover": {
        border: state.isFocused
          ? "1px solid rgb(0,0,0)"
          : "1px solid rgb(169, 167, 167)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 100,
      margin: "5px 0 0 0",
      padding: 0,
      "& > div:first-child": {
        padding: "0",
        maxHeight: "140px !important",
      },
      "* > div:last-child": {
        border: "none",
      },
      "*::-webkit-scrollbar": {
        width: "3px",
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "lightgrey",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(17, 85, 95)",
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    dropdownIndicator: (provided) => ({
      ...provided,
      border: 0,
      padding: 0,
      display: isDisabled ? "none" : "",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      fontWeight: 600,
      letterSpacing: "0.5px",
      fontSize: "12px",
      fontFamily: "Montserrat-SemiBold",
      color: "rgb(17, 85, 95)",
      borderBottom: "1px solid #CADEDD",
      backgroundColor: isSelected
        ? "rgb(17, 85, 95, 0.1)"
        : isFocused
        ? "#E8E8E8"
        : "white",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      padding: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    valueContainer: (provided, state) => {
      const selected_elements = state?.children?.[0];
      const is_more_than_four_selected =
        Array.isArray(selected_elements) && selected_elements?.length >= 3;
      return {
        ...provided,
        padding: "0",
        maxHeight: isMulti ? 64 : 32,
        overflowY: is_more_than_four_selected && "auto",
        "::-webkit-scrollbar": {
          width: "2px",
        },
        "::-webkit-scrollbar-track": {
          margin: "5px 0",
          backgroundColor: "lightgrey",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#2BB9A8",
        },
      };
    },
    indicatorsContainer: (provided) => ({
      ...provided,
      display: isDisabled ? "none" : "flex",
      padding: "0",
      "& div": {
        padding: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& span": {
        display: "none",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontFamily: "system-ui",
    }),
    multiValue: (provided) => ({
      ...provided,
      color: "#2BB9A8",
      fontFamily: "system-ui",
      borderRadius: "5px",
      margin: "5px",
      background: "#22bdaa30",
      fontSize: "15px",
      fontWeight: "600",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#2BB9A8",
    }),
  };

  const readOnlyCustomStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      fontSize: "12px",
      boxShadow: state.isFocused ? "0 0 0 0.2rem transparent" : "none",
      border: "none",
      background: "#fff",
      marginTop: "-1px",
      padding: "0 5px",
      minHeight: 32,
      maxHeight: 32,
      "*::-webkit-scrollbar": {
        display: "none",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      border: 0,
      padding: 0,
      display: "none",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      fontWeight: 600,
      fontSize: "12px",
      color: "#2BB9A8",
      borderBottom: ".25px solid",
      backgroundColor: isSelected ? "#D1F8E8" : isFocused ? "#fff" : "#fff",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
      maxHeight: 35,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0",
      display: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontWeight: 600,
      fontSize: "14px",
      marginLeft: 0,
    }),
  };

  const { IndicatorsContainer, Menu } = selectComponents;

  const [showSmartSearch, setShowSmartSearch] = useState(false);

  useEffect(() => {
    if (showSmartSearch) {
      const timer = setTimeout(() => {
        setInputFocus(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSmartSearch]);

  const CustomIndicatorsContainer = forwardRef(
    ({ clearValue, hasValue, setIsMenuOpen, ...props }, ref) => {
      return (
        <IndicatorsContainer {...props}>
          {hasValue && (
            <ClearRoundedIcon
              onClick={() => {
                clearValue();
                ref?.current?.blur();
              }}
            />
          )}
          {smartSearchEndpoint && (
            <>
              {!showSmartSearch && (
                <Tooltip title="Smart Search" placement="top" arrow>
                  <SearchIcon
                    onClick={() => {
                      ref.current.blur();
                      setShowSmartSearch(true);
                    }}
                  />
                </Tooltip>
              )}
            </>
          )}
          {!showSmartSearch && (
            <KeyboardArrowDownRoundedIcon
              onClick={() => {
                ref?.current?.focus();
              }}
            />
          )}
        </IndicatorsContainer>
      );
    }
  );
  CustomIndicatorsContainer.displayName = "CustomIndicatorsContainer";

  const MenuRef = forwardRef((menuProps, ref) => (
    <div ref={ref}>
      <Menu {...menuProps} />
    </div>
  ));
  MenuRef.displayName = "MenuRef";

  return (
    <InputContainer
      Width={Width}
      minHeight={minHeight}
      marginBottom={marginBottom}
      id={fieldId ? fieldId : ""}
    >
      <CustomLabel htmlFor={id}>
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </CustomLabel>
      {description && (
        <Tooltip title={description} placement="top" arrow>
          <InfoOutlinedIcon
            style={{
              color: "rgb(17, 85, 95)",
              height: "14px",
              margin: "0 4px",
              position: "relative",
              top: "3px",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      )}
      <Controller
        control={control}
        name={id}
        render={({ field: { onChange, value } }) => (
          <Select
            ref={selectRef}
            value={value}
            onChange={(value) => {
              onChange(value);
              if (typeof setValue === "function") {
                setValue(value);
              }
              if (typeof onInputChange === "function") {
                onInputChange(value);
              }
            }}
            inputValue={dropDownInputValue}
            // onInputChange={(newValue, actionMeta) => {
            //   if (actionMeta.action === "input-change") {
            //     onInput(newValue);
            //   }
            // }}
            // onMenuScrollToBottom={() => {
            //   setScrolledToBottom(true);
            // }}
            id={id}
            isDisabled={isDisabled}
            options={selectObj}
            placeholder={placeholder}
            isLoading={isLoading}
            isMulti={isMulti}
            closeMenuOnSelect={closeMenuOnSelect}
            components={{
              IndicatorsContainer: CustomIndicatorsContainer,
              Menu: MenuRef,
              ...components,
            }}
            error={errors?.[id]}
            styles={customStyles}
            menuPortalTarget={menuPortalTarget}
            noOptionsMessage={() => noOptionMessage}
          />
        )}
      />
      {errors?.[id] && (
        <Tooltip title={errors[id]?.message || ""} arrow placement="bottom">
          <ErrorWrapper>
            <ErrorMessage message={errors[id]?.message} />
          </ErrorWrapper>
        </Tooltip>
      )}
    </InputContainer>
  );
}

export default Dropdown;
