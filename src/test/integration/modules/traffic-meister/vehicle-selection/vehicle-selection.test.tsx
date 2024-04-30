/**
 * @author Abhijit Baldawa
 */

import crypto from "crypto";
import React from "react";
import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  VehicleSelection,
  UserVehicleAttributeSelection,
} from "../../../../../app/modules/traffic-meister/containers/vehicle-selection/vehicle-selection";
import {
  testPlan,
  mockVehicles,
} from "./mock-test-data/vehicle-selection-test-mock";
import * as trafficMeisterService from "../../../../../app/store/vehicle/service";
import { PopupHandler } from "../../../../../app/shared/components/app-components/popup/containers/popup-handler/popup-handler";

// Mock the crypto module used internally by popup handler
Object.defineProperty(global, "crypto", {
  value: {
    ...crypto,
  },
});

/**
 * Mock service methods, so we only test the service methods behavior
 * and not its implementation.
 *
 * This also means we are not causing any side effects and no flaky tests
 */
jest.mock<typeof import("../../../../../app/store/vehicle/service")>(
  "../../../../../app/store/vehicle/service"
);

describe(`Integration test: 'modules/traffic-meister/containers/vehicle-selection'`, () => {
  // ----- Utility methods -----
  /**
   * Given the vehicle attribute type, returns the
   * corresponding listBox html element
   *
   * @param attributeType
   * @returns
   */
  const getVehicleAttributeSelectorListBox = (
    attributeType: UserVehicleAttributeSelection["attributeType"]
  ) =>
    within(screen.getByTestId(`select-vehicle-${attributeType}`)).getByRole(
      "button"
    );

  /**
   * In the currently opened listBox,returns all the
   * HTML element of list items
   *
   * @returns
   */
  const getVehicleAttributeListItems = () => {
    const listBox = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );
    const listItems = within(listBox).getAllByRole("option");

    return listItems;
  };

  /**
   * In the currently opened listBox, finds and returns
   * the HTML element of list item by provided itemValue
   *
   * @param itemValue
   * @returns
   */
  const findVehicleAttributeListItem = (itemValue: string) => {
    const listItems = getVehicleAttributeListItems();

    return listItems.find(
      (listItem) => listItem.getAttribute("data-value") === itemValue
    );
  };

  /**
   * Returns all list item values of the currently
   * opened listbox
   *
   * @returns
   */
  const getVehicleAttributeListItemValues = () => {
    const listItems = getVehicleAttributeListItems();
    return listItems.map((listItem) => listItem.getAttribute("data-value"));
  };

  /**
   * Given a listBox returns all the list item values
   *
   * @param listBox
   * @returns
   */
  const getListItemsValue = (listBox: HTMLElement) => {
    // Open the select box
    fireEvent.mouseDown(listBox);

    // Get all the displayed list item values
    const listItemValues = getVehicleAttributeListItemValues();

    // Get hold of the selected list item html element
    const selectedListItem = findVehicleAttributeListItem(
      listBox.textContent && listBox.textContent !== "Please Select"
        ? listBox.textContent
        : ""
    );

    // Close the select box by keeping its selected value
    if (selectedListItem) {
      fireEvent.click(selectedListItem);
    }

    // return all non-empty select box list item values
    return listItemValues.filter(Boolean) as string[];
  };

  /**
   * Sets the value of listBox with the provided
   * itemValue
   *
   * @param listBox
   * @param itemValue
   */
  const selectListItemByValue = (listBox: HTMLElement, itemValue: string) => {
    // Open the select box
    fireEvent.mouseDown(listBox);

    // Find list item html element to be selected
    const listItemToBeSelected = findVehicleAttributeListItem(itemValue);

    if (!listItemToBeSelected) {
      throw new Error(`itemValue = ${itemValue} not found in list`);
    }

    // Set the value of select box with the list item
    fireEvent.click(listItemToBeSelected);
  };

  /**
   * Returns a map of all vehicle attributes with
   * their respective html listbox element
   *
   * @returns
   */
  const getVehicleAttributeToListBox = () => ({
    type: getVehicleAttributeSelectorListBox("type"),
    brand: getVehicleAttributeSelectorListBox("brand"),
    color: getVehicleAttributeSelectorListBox("color"),
  });

  // ----- Assertions methods ------
  /**
   * Verifies whether the UI is in loading state
   * and that once the data is loaded, the loading
   * state is finished
   */
  const verifyLoadingState = async () => {
    // Loading should appear on UI when the data is loading
    const progressBar = await screen.findByTestId("loader");

    // Mock service method should be called to get vehicles data
    await waitFor(() =>
      expect(trafficMeisterService.getVehicles).toHaveBeenCalled()
    );

    // Loading should disappear once the data is loaded
    await waitFor(() => expect(progressBar).not.toBeInTheDocument());
  };

  beforeEach(() => {
    (
      trafficMeisterService.getVehicles as jest.Mock<
        ReturnType<typeof trafficMeisterService.getVehicles>
      >
    ).mockClear();
  });

  it(`Should show the loader while vehicles data is being fetched and hide the loader once the data is fetched`, async () => {
    // Mock service method
    (
      trafficMeisterService.getVehicles as jest.Mock<
        ReturnType<typeof trafficMeisterService.getVehicles>
      >
    ).mockResolvedValueOnce(mockVehicles);

    render(<VehicleSelection />);

    // Verify that the data loading status is shown on the UI
    await verifyLoadingState();
  });

  it(`Should show the error popup if there is an error while fetching vehicles`, async () => {
    // Mock the service method to throw error
    (
      trafficMeisterService.getVehicles as jest.Mock<
        ReturnType<typeof trafficMeisterService.getVehicles>
      >
    ).mockRejectedValueOnce(new Error("dummy error"));

    // Render the container component with popup handler component
    render(
      <>
        <PopupHandler />
        <VehicleSelection />
      </>
    );

    await verifyLoadingState();

    /**
     * Verify whether the UI shows error popup displaying the thrown
     * error from the mock service method
     */
    const [presentationElement] = await screen.findAllByRole("presentation");

    const errorPopup = within(presentationElement).getByRole("alert", {
      name: /api error popup/i,
    });

    expect(errorPopup).toHaveTextContent("dummy error");
  });

  it(`Should show the info popup if no vehicles were found`, async () => {
    // Mock the service method to throw error
    (
      trafficMeisterService.getVehicles as jest.Mock<
        ReturnType<typeof trafficMeisterService.getVehicles>
      >
    ).mockResolvedValueOnce([]);

    // Render the container component with popup handler component
    render(
      <>
        <PopupHandler />
        <VehicleSelection />
      </>
    );

    await verifyLoadingState();

    /**
     * Verify whether the UI shows info popup informing user
     * that no vehicle has been found
     */
    const [presentationElement] = await screen.findAllByRole("presentation");

    const infoPopup = within(presentationElement).getByRole("alert", {
      name: /info popup/i,
    });

    expect(infoPopup).toHaveTextContent(/no vehicles found/i);
  });

  it(`Should enable all three lists when vehicles data is available`, async () => {
    // Mock service method
    (
      trafficMeisterService.getVehicles as jest.Mock<
        ReturnType<typeof trafficMeisterService.getVehicles>
      >
    ).mockResolvedValueOnce(mockVehicles);

    render(<VehicleSelection />);

    await verifyLoadingState();

    // Get references to all the listBox html elements
    const vehicleAttributeToListBox = getVehicleAttributeToListBox();

    // Test all the test scenarios
    testPlan.fullListTests.forEach((fullListTest) => {
      expect(
        getListItemsValue(vehicleAttributeToListBox[fullListTest.key])
      ).toEqual(fullListTest.values);
    });
  });

  it(`When selecting an option in one of the list, the other lists are filtered accordingly`, async () => {
    // Mock service method
    (
      trafficMeisterService.getVehicles as jest.Mock<
        ReturnType<typeof trafficMeisterService.getVehicles>
      >
    ).mockResolvedValueOnce(mockVehicles);

    render(<VehicleSelection />);

    await verifyLoadingState();

    // Get references to all the listBox html elements
    const vehicleAttributeToListBox = getVehicleAttributeToListBox();

    // Test all the test scenarios
    testPlan.filteredListTestScenarios.forEach((filteredListTestScenario) => {
      if (filteredListTestScenario.selectAttribute) {
        selectListItemByValue(
          vehicleAttributeToListBox[
            filteredListTestScenario.selectAttribute.key
          ],
          filteredListTestScenario.selectAttribute.value
        );
      }

      filteredListTestScenario.tests.forEach((test) => {
        expect(getListItemsValue(vehicleAttributeToListBox[test.key])).toEqual(
          test.values
        );
      });
    });
  });

  it(`Should show all selections simultaneously`, async () => {
    // Mock service method
    (
      trafficMeisterService.getVehicles as jest.Mock<
        ReturnType<typeof trafficMeisterService.getVehicles>
      >
    ).mockResolvedValueOnce(mockVehicles);

    render(<VehicleSelection />);

    await verifyLoadingState();

    // Get references to all the listBox html elements
    const vehicleAttributeToListBox = getVehicleAttributeToListBox();

    // Test all the test scenarios
    testPlan.listSelectionDisplayTestScenarios.forEach(
      (listSelectionDisplayTestScenario) => {
        if (listSelectionDisplayTestScenario.selectAttribute) {
          selectListItemByValue(
            vehicleAttributeToListBox[
              listSelectionDisplayTestScenario.selectAttribute.key
            ],
            listSelectionDisplayTestScenario.selectAttribute.value
          );
        }

        listSelectionDisplayTestScenario.tests.forEach((test) => {
          expect(screen.getByTestId(`selected-${test.key}`)).toHaveTextContent(
            test.selectedValue
          );
        });
      }
    );
  });
});
