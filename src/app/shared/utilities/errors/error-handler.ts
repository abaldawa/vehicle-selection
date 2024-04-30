/**
 * @author Abhijit Baldawa
 */

import { z } from "zod";

/**
 * @public
 *
 * Central error handler which inspects
 * error and returns appropriate details and error message
 *
 * @param error
 * @param errMsgIfNoMatch
 */
const getErrorDetails = (
  error: unknown,
  errMsgIfNoMatch: string
): {
  errorMessage: string;
  details?: unknown;
} => {
  let errorMessage: string;
  let details: unknown;

  if (error instanceof z.ZodError) {
    [errorMessage, details] = ["Invalid api response", error.format()];
  } else if (error instanceof Error) {
    errorMessage = `${errMsgIfNoMatch}. Reason -> ${error.message}`;
  } else {
    errorMessage = `${errMsgIfNoMatch}. Reason (unknown error) ->  ${error}`;
  }

  return { errorMessage, details };
};

export { getErrorDetails };
