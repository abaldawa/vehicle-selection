/**
 * @author Abhijit Baldawa
 *
 * Central store to manage vehicles data
 */

import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { immer } from "zustand/middleware/immer";
import { Vehicle } from "./model";
import * as vehicleService from "./service";

interface VehicleStore {
  loading: boolean;
  error?: unknown;
  vehicles?: Vehicle[];
  fetchVehicles: () => Promise<void>;
}

const useVehicleStore = createWithEqualityFn<VehicleStore>()(
  immer((set) => ({
    loading: false,

    fetchVehicles: async () => {
      try {
        set((state) => void (state.loading = true));

        const vehicles = await vehicleService.getVehicles();

        set((state) => void (state.vehicles = vehicles));
      } catch (error) {
        set((state) => void (state.error = error));
      } finally {
        set((state) => void (state.loading = false));
      }
    },
  })),
  shallow
);

export { useVehicleStore };
