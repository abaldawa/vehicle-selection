/**
 * @author Abhijit Baldawa
 */

import { z } from "zod";

/**
 * Model representing vehicle data structure
 */
const VehicleSchema = z
  .object({
    /**
     * Unique identifier of the vehicle
     */
    id: z.number(),

    /**
     * Type of the vehicle
     *
     * @example 'car' | 'airplane' | ...
     */
    type: z.string().nonempty(),

    /**
     * Brand of the vehicle
     *
     * @example 'Bugatti Veyron'
     */
    brand: z.string().nonempty(),

    /**
     * Colors in which this vehicle is available
     *
     * @example ['red', 'white']
     */
    colors: z.string().nonempty().array().nonempty(),

    /**
     * URL of the image of vehicle
     */
    img: z.string().url(),
  })
  .strict();

type Vehicle = z.infer<typeof VehicleSchema>;

export type { Vehicle };
export { VehicleSchema };
