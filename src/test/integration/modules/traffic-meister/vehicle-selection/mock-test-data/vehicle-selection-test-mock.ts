/**
 * @author Abhijit Baldawa
 *
 * This module has mock data, test scenarios along with its associated test result
 * and a full test plan.
 *
 * Tests can be extended by adding new test scenarios object to test
 * those new scenarios.
 */

import { mockVehicles } from "../../../../../../app/store/vehicle/mock-data/vehicles";

// Expected unique vehicle types
const vehicleTypes = ["car", "airplane", "train"] as const;

// Expected unique vehicle brands
const vehicleBrands = [
  "Bugatti Veyron",
  "Boeing 787 Dreamliner",
  "USRA 0-6-6",
  "Canadair North Star",
  "Airbus A400M Atlas",
  "Bloch MB.131",
  "Prairie 2-6-2",
  "EMD GP40",
  "Amer 4-4-0",
  "Ferrari F40",
  "Lamborghini Huracán",
  "Porsche Carrera GT",
] as const;

// Expected unique vehicle colors
const vehicleColors = [
  "red",
  "black",
  "white",
  "green",
  "yellow",
  "blue",
  "brown",
  "grey",
] as const;

type VehicleType = (typeof vehicleTypes)[number];
type vehicleBrand = (typeof vehicleBrands)[number];
type VehicleColor = (typeof vehicleColors)[number];

/**
 * A filtered list test scenario representing
 * a select action and its associated tests with expected
 * filtered list values
 */
interface FilteredListTestScenario {
  /**
   * Represents an action
   */
  selectAttribute?:
    | {
        key: "type";
        value: VehicleType;
      }
    | {
        key: "brand";
        value: vehicleBrand;
      }
    | {
        key: "color";
        value: VehicleColor;
      };

  /**
   * Represents tests with expected values
   */
  tests: [
    {
      key: "type";
      values: readonly VehicleType[];
    },
    {
      key: "brand";
      values: readonly vehicleBrand[];
    },
    {
      key: "color";
      values: readonly VehicleColor[];
    }
  ];
}

/**
 * Tests to verify full lists when no select box is selected
 * with any value
 */
const fullListTests: FilteredListTestScenario["tests"] = [
  { key: "type", values: vehicleTypes },
  { key: "brand", values: vehicleBrands },
  { key: "color", values: vehicleColors },
];

/**
 * Test scenarios to test that when user selects an option
 * in one of the list, the other lists are filtered accordingly
 */
const filteredListTestScenarios: FilteredListTestScenario[] = [
  {
    tests: [
      {
        key: "type",
        values: vehicleTypes,
      },
      {
        key: "brand",
        values: vehicleBrands,
      },
      {
        key: "color",
        values: vehicleColors,
      },
    ],
  },

  {
    selectAttribute: {
      key: "type",
      value: "car",
    },
    tests: [
      {
        key: "type",
        values: vehicleTypes,
      },
      {
        key: "brand",
        values: [
          "Bugatti Veyron",
          "Ferrari F40",
          "Lamborghini Huracán",
          "Porsche Carrera GT",
        ],
      },
      {
        key: "color",
        values: ["red", "black", "yellow", "white", "green"],
      },
    ],
  },

  {
    selectAttribute: {
      key: "brand",
      value: "Ferrari F40",
    },
    tests: [
      {
        key: "type",
        values: vehicleTypes,
      },
      {
        key: "brand",
        values: [
          "Bugatti Veyron",
          "Ferrari F40",
          "Lamborghini Huracán",
          "Porsche Carrera GT",
        ],
      },
      {
        key: "color",
        values: ["red", "yellow"],
      },
    ],
  },

  {
    selectAttribute: {
      key: "color",
      value: "yellow",
    },
    tests: [
      {
        key: "type",
        values: vehicleTypes,
      },
      {
        key: "brand",
        values: [
          "Bugatti Veyron",
          "Ferrari F40",
          "Lamborghini Huracán",
          "Porsche Carrera GT",
        ],
      },
      {
        key: "color",
        values: ["red", "yellow"],
      },
    ],
  },
];

/**
 * A test scenario which represents whether selecting
 * a value from any listbox is displayed on the UI
 * appropriately
 */
interface ListSelectionDisplayTestScenario
  extends Pick<FilteredListTestScenario, "selectAttribute"> {
  /**
   * Represents tests with expected values
   */
  tests: [
    {
      key: "type";
      selectedValue: VehicleType | "";
    },
    {
      key: "brand";
      selectedValue: vehicleBrand | "";
    },
    {
      key: "color";
      selectedValue: VehicleColor | "";
    }
  ];
}

const listSelectionDisplayTestScenarios: ListSelectionDisplayTestScenario[] = [
  {
    tests: [
      { key: "type", selectedValue: "" },
      { key: "brand", selectedValue: "" },
      { key: "color", selectedValue: "" },
    ],
  },

  {
    selectAttribute: {
      key: "type",
      value: "airplane",
    },
    tests: [
      { key: "type", selectedValue: "airplane" },
      { key: "brand", selectedValue: "" },
      { key: "color", selectedValue: "" },
    ],
  },

  {
    selectAttribute: {
      key: "brand",
      value: "Boeing 787 Dreamliner",
    },
    tests: [
      { key: "type", selectedValue: "airplane" },
      { key: "brand", selectedValue: "Boeing 787 Dreamliner" },
      { key: "color", selectedValue: "" },
    ],
  },

  {
    selectAttribute: {
      key: "color",
      value: "white",
    },
    tests: [
      { key: "type", selectedValue: "airplane" },
      { key: "brand", selectedValue: "Boeing 787 Dreamliner" },
      { key: "color", selectedValue: "white" },
    ],
  },
];

/**
 * A test plan highlighting all the tests or test scenarios
 */
const testPlan = {
  fullListTests,
  filteredListTestScenarios,
  listSelectionDisplayTestScenarios,
} as const;

/**
 * Export all related data together so that it is easy to co-locate mock data
 * along with its related mock results
 */
export { testPlan, mockVehicles };
