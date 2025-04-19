import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const FormField = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  helperText,
  options = [],
  multiline = false,
  rows = 1,
  fullWidth = true,
  required = false,
  disabled = false,
  ...rest
}) => {
  // For select fields
  if (type === "select") {
    return (
      <FormControl
        fullWidth={fullWidth}
        error={!!error}
        required={required}
        disabled={disabled}
      >
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  // For text, email, password, etc.
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={!!error}
      helperText={error ? helperText : ""}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      {...rest}
    />
  );
};

export default FormField;
