/**
 * @author Abhijit Baldawa
 */

import React, { useEffect, useMemo, useState } from "react";
import { Vehicle } from "../../../../store/vehicle/model";
import trafficMeisterLogo from "../../../../../assets/images/traffic-meister.png";
import {
  VehicleAttribute,
  VehicleAttributeSelection,
} from "../../components/vehicle-attribute-selection/vehicle-attribute-selection";
import { VehicleAttributes } from "../../components/vehicle-attributes/vehicle-attributes";
import { Loading } from "../../../../shared/components/ui/loading/loading";
import { usePopupStore } from "../../../../store/popup/store";
import { useVehicleStore } from "../../../../store/vehicle/store";
import * as S from "./vehicle-selection.styles";

// UI labels of all select box
type VehicleAttributeLabel = "Vehicle" | "Brand" | "Color";

// Track user selection
type UserVehicleAttributeSelection =
  | { attributeType: "type"; value: string }
  | { attributeType: "brand"; value: string }
  | { attributeType: "color"; value: string };

// A map representation of user selection for quick lookup
type UserVehicleSelectionAttributeToValueMap = {
  [VehicleAttributeType in UserVehicleAttributeSelection["attributeType"]]?: string;
};

const VehicleSelection: React.FC = () => {
  const [userVehicleAttributeSelections, setUserVehicleAttributeSelections] =
    useState<UserVehicleAttributeSelection[]>([]);

  const { error, loading, vehicles, fetchVehicles } = useVehicleStore(
    (state) => ({
      vehicles: state.vehicles,
      error: state.error,
      loading: state.loading,
      fetchVehicles: state.fetchVehicles,
    })
  );

  const { showPopup } = usePopupStore((state) => ({
    showPopup: state.showPopup,
  }));

  /**
   * Given user selection map and a vehicle property
   * returns all the unique filtered values of that
   * properties from all fetched vehicles which satisfies
   * user selection.
   *
   * @param userVehicleSelectionAttributeToValueMap
   * @param vehicleProperty
   * @returns  unique filtered property list based on user selection
   */
  const getUniqueVehiclePropertyValues = (
    userVehicleSelectionAttributeToValueMap: UserVehicleSelectionAttributeToValueMap,
    vehicleProperty: keyof Pick<Vehicle, "type" | "brand" | "colors">
  ) => {
    const vehiclePropertyValues: Vehicle[typeof vehicleProperty][] = [];

    // Track filtered values for the property
    vehicles?.forEach((vehicle) => {
      if (
        (!userVehicleSelectionAttributeToValueMap.type ||
          userVehicleSelectionAttributeToValueMap.type === vehicle.type) &&
        (!userVehicleSelectionAttributeToValueMap.brand ||
          vehicle.brand === userVehicleSelectionAttributeToValueMap.brand) &&
        (!userVehicleSelectionAttributeToValueMap.color ||
          vehicle.colors.includes(
            userVehicleSelectionAttributeToValueMap.color
          ))
      ) {
        vehiclePropertyValues.push(vehicle[vehicleProperty]);
      }
    });

    return Array.from(new Set(vehiclePropertyValues.flat()));
  };

  /**
   * Handles every user selection on any selectBox
   *
   * @param userVehicleAttributeSelection
   */
  const vehicleAttributeSelectionHandler = (
    userVehicleAttributeSelection: UserVehicleAttributeSelection
  ) => {
    const { attributeType, value } = userVehicleAttributeSelection;

    setUserVehicleAttributeSelections((prevUserVehicleAttributeSelections) => {
      // 1. Handle selection removal
      if (!value) {
        return prevUserVehicleAttributeSelections.filter(
          (prevUserVehicleAttributeSelection) =>
            prevUserVehicleAttributeSelection.attributeType !== attributeType
        );
      }

      // 2. Check and handle if any existing selected option is modified
      const foundIndex = prevUserVehicleAttributeSelections.findIndex(
        (prevUserVehicleAttributeSelection) =>
          prevUserVehicleAttributeSelection.attributeType === attributeType
      );

      if (foundIndex !== -1) {
        /**
         * Modify existing selection option and remove all the
         * selection option after this index because the values
         * of those list will be changed after the modification
         * as they are dependent on this
         */
        return prevUserVehicleAttributeSelections
          .slice(0, foundIndex + 1)
          .map((prevUserVehicleAttributeSelection) => {
            if (
              prevUserVehicleAttributeSelection.attributeType === attributeType
            ) {
              return { ...prevUserVehicleAttributeSelection, value };
            }

            return prevUserVehicleAttributeSelection;
          });
      }

      // 3. Add new selection option
      return [...prevUserVehicleAttributeSelections, { attributeType, value }];
    });
  };

  /**
   * Get array of all listBox metadata and its filtered/selected values
   * according to user selection
   */
  const { vehicleAttributes } = useMemo(() => {
    const vehicleSelectionAttributeToValueMap: UserVehicleSelectionAttributeToValueMap =
      {};

    let vehicleTypes: string[] | undefined;
    let vehicleBrands: string[] | undefined;
    let vehicleColors: string[] | undefined;

    // For every user selection get its unique values and filter the next list accordingly
    for (const userVehicleAttributeSelection of userVehicleAttributeSelections) {
      switch (userVehicleAttributeSelection.attributeType) {
        case "type": {
          vehicleTypes = getUniqueVehiclePropertyValues(
            vehicleSelectionAttributeToValueMap,
            "type"
          );

          // Track user selection to filter next list
          vehicleSelectionAttributeToValueMap.type =
            userVehicleAttributeSelection.value;
          break;
        }

        case "brand": {
          vehicleBrands = getUniqueVehiclePropertyValues(
            vehicleSelectionAttributeToValueMap,
            "brand"
          );

          // Track user selection to filter next list
          vehicleSelectionAttributeToValueMap.brand =
            userVehicleAttributeSelection.value;
          break;
        }

        case "color": {
          vehicleColors = getUniqueVehiclePropertyValues(
            vehicleSelectionAttributeToValueMap,
            "colors"
          );

          // Track user selection to filter next list
          vehicleSelectionAttributeToValueMap.color =
            userVehicleAttributeSelection.value;
          break;
        }
      }
    }

    /**
     * Make sure that we filter and get unique values
     * of all the lists
     */
    if (!vehicleTypes) {
      vehicleTypes = getUniqueVehiclePropertyValues(
        vehicleSelectionAttributeToValueMap,
        "type"
      );
    }

    if (!vehicleBrands) {
      vehicleBrands = getUniqueVehiclePropertyValues(
        vehicleSelectionAttributeToValueMap,
        "brand"
      );
    }

    if (!vehicleColors) {
      vehicleColors = getUniqueVehiclePropertyValues(
        vehicleSelectionAttributeToValueMap,
        "colors"
      );
    }

    // Prepare array of all listBox data required to show each listBox
    const vehicleAttributeList: VehicleAttribute[] = [
      {
        type: "type",
        label: "Vehicle",
        values: vehicleTypes,
        selectedValue: vehicleSelectionAttributeToValueMap["type"],
      },
      {
        type: "brand",
        label: "Brand",
        values: vehicleBrands,
        selectedValue: vehicleSelectionAttributeToValueMap["brand"],
      },
      {
        type: "color",
        label: "Color",
        values: vehicleColors,
        selectedValue: vehicleSelectionAttributeToValueMap["color"],
      },
    ];

    return {
      vehicleAttributes: vehicleAttributeList,
    };
  }, [vehicles, userVehicleAttributeSelections]);

  /**
   * If no vehicles are found then this useEffect hook
   * shows the popup informing user the same
   */
  useEffect(() => {
    if (vehicles && !vehicles.length) {
      showPopup({
        type: "info",
        title: "Info",
        description: "No vehicles found",
        dismissible: true,
        variant: "warning",
        buttons: {
          confirm: {
            label: "OK",
          },
        },
      });
    }
  }, [vehicles]);

  /**
   * This useEffect hook shows error popup if
   * there is an error in fetching the vehicles
   */
  useEffect(() => {
    if (error) {
      showPopup({
        type: "api-error",
        title: "Error fetching vehicles data",
        dismissible: true,
        error,
        buttons: {
          confirm: {
            label: "OK",
          },
        },
      });
    }
  }, [error]);

  /**
   * This useEffect hook fetches vehicles on mount
   */
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      {loading && <Loading />}

      <S.Container>
        <S.HeaderWrapper>
          <S.HeaderImage alt="Traffic meister logo" src={trafficMeisterLogo} />
        </S.HeaderWrapper>

        <S.VehicleAttributeSelectionWrapper>
          <S.SolidBorder>
            <VehicleAttributeSelection
              vehicleAttributes={vehicleAttributes}
              vehicleAttributeSelectionHandler={
                vehicleAttributeSelectionHandler
              }
            />
          </S.SolidBorder>
        </S.VehicleAttributeSelectionWrapper>

        <S.VehicleAttributeDisplayWrapper>
          <S.SolidBorder>
            <VehicleAttributes
              attributes={vehicleAttributes.map((vehicleAttribute) => ({
                id: vehicleAttribute.type,
                label: vehicleAttribute.label,
                value: vehicleAttribute.selectedValue,
              }))}
            />
          </S.SolidBorder>
        </S.VehicleAttributeDisplayWrapper>
      </S.Container>
    </>
  );
};

export type { UserVehicleAttributeSelection, VehicleAttributeLabel };
export { VehicleSelection };
