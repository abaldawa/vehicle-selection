/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { SelectBox } from "../../../../shared/components/ui/select-box/select-box";
import type {
  UserVehicleAttributeSelection,
  VehicleAttributeLabel,
} from "../../containers/vehicle-selection/vehicle-selection";
import * as S from "./vehicle-attribute-selection.styles";

/**
 * Represents data structure of a single selectBox
 */
interface VehicleAttribute {
  /**
   * Unique value highlighting the type of selectBox
   */
  type: UserVehicleAttributeSelection["attributeType"];

  /**
   * Label of the selectBox
   */
  label: VehicleAttributeLabel;

  /**
   * All unique values of the selectBox
   */
  values: string[];

  /**
   * Selected value of the selectBox
   */
  selectedValue?: string;
}

interface VehicleAttributeSelectionProps {
  vehicleAttributes: VehicleAttribute[];
  vehicleAttributeSelectionHandler: (
    userVehicleAttributeSelection: UserVehicleAttributeSelection
  ) => void;
}

const VehicleAttributeSelection: React.FC<VehicleAttributeSelectionProps> = (
  props
) => {
  const { vehicleAttributes, vehicleAttributeSelectionHandler } = props;

  return (
    <S.Container>
      {vehicleAttributes.map((vehicleAttribute) => (
        <SelectBox
          key={vehicleAttribute.type}
          id={`select-vehicle-${vehicleAttribute.type}`}
          label={vehicleAttribute.label}
          onChange={(value) =>
            vehicleAttributeSelectionHandler({
              attributeType: vehicleAttribute.type,
              value,
            })
          }
          value={vehicleAttribute.selectedValue || ""}
          options={
            vehicleAttribute.values.map((value) => ({
              id: value,
              label: value,
              value,
            })) || []
          }
        />
      ))}
    </S.Container>
  );
};

export type { VehicleAttribute };
export { VehicleAttributeSelection };
