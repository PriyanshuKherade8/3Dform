import React, { useRef } from "react";
import { useController } from "react-hook-form";
import { Button } from "@mui/material";

const FilePicker = ({ control, name, label }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileBlob = new Blob([file], { type: file.type });
      onChange(fileBlob); // Pass Blob object to React Hook Form
    } else {
      onChange(null);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        onChange={handleChange}
        onBlur={onBlur}
        style={{ display: "none" }}
      />
      <Button variant="contained" component="span" onClick={handleClick}>
        {label}
      </Button>
      {value && <div>Selected File: {URL.createObjectURL(value)}</div>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default FilePicker;
