/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import * as S from "./select-box.styles";

interface SelectBoxProps {
  label: string;
  id: string;
  options: { id: string; label: string; value: string }[];
  value: string;
  onChange: (selectedValue: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = (props) => {
  const { id, label, options, value, onChange } = props;

  return (
    <S.Container>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        size="small"
        data-testid={id}
        value={value}
        displayEmpty
        onChange={(event) => onChange(event.target.value)}
      >
        <MenuItem value="">
          <em>Please Select</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </S.Container>
  );
};

export { SelectBox };
