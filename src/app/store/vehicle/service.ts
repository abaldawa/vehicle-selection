/**
 * @author Abhijit Baldawa
 */

import { mockVehicles } from "./mock-data/vehicles";
import { Vehicle, VehicleSchema } from "./model";

/**
 * @private
 *
 * Mock fetch method simulating the REST Api call
 *
 * @returns
 */
const fetchMockData = () =>
  new Promise<Vehicle[]>((resolve, reject) => {
    setTimeout(function () {
      if (Math.floor(Math.random() * 20) === 2) {
        reject(new Error("Fetch data error"));
      } else {
        resolve(mockVehicles);
      }
    }, 1000);
  });

const VehiclesSchema = VehicleSchema.array();

/**
 * @public
 *
 * Fetches the vehicles, validates it and
 * returns them
 *
 * @returns
 */
const getVehicles = async () => {
  const vehicles = await fetchMockData();
  return VehiclesSchema.parseAsync(vehicles);
};

export { getVehicles };
