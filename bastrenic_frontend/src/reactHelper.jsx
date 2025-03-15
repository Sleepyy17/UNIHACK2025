import { MenuItem, TextField } from "@mui/material";
import { useId } from "react";
import { formInputStyle } from "./helper";

// This helper file is different from the main helper file because each function
// only returns react components which suppresses an error message. 

export function SelectImageUploadType({imageUpload, setImageUpload}) {
  const id = useId();
  const sourceImageOptions = [
    {label: 'URL'},
    {label: 'File Upload'},
  ];
  
  return (
    <TextField
      id={id}
      name="image-type"
      select
      label="Select Upload Type"
      value={imageUpload}
      variant="standard"
      sx={{mt: 1.875, ...formInputStyle}}
      slotProps={{
        htmlInput: {id: 'image-type'}, 
        inputLabel: {htmlFor: 'image-type'}
      }}
    >
      {sourceImageOptions.map((option) => (
        <MenuItem
          key={option.label} 
          value={option.label}
          onClick={() => setImageUpload(option.label)}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export function SelectField({
  id,
  name,
  label,
  value,
  options,
  setValue,
}) {
  return (
    <TextField
      id={id}
      name={name}
      select
      label={label}
      value={value}
      variant="standard"
      sx={{ mt: 1.875, ...formInputStyle }}
      slotProps={{
        htmlInput: { id: name },
        inputLabel: { htmlFor: name }
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.label}
          value={option.label}
          onClick={() => setValue(option.label)}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}