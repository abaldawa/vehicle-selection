/**
 * @author Abhijit Baldawa
 */

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface VehicleAttributesProps {
  attributes: {
    id: string;
    label: string;
    value?: string;
  }[];
}

const VehicleAttributes: React.FC<VehicleAttributesProps> = (props) => {
  const { attributes } = props;

  return (
    <TableContainer>
      <Table border={1}>
        <TableBody>
          {attributes.map((attribute) => (
            <TableRow key={attribute.id}>
              <TableCell sx={{ fontWeight: "bold", width: 100 }}>
                {attribute.label}
              </TableCell>
              <TableCell data-testid={`selected-${attribute.id}`}>
                {attribute.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { VehicleAttributes };
