import { IError } from "@/interface/error";
/**
 * ErrorHandler function handles error messages and displays them in a user-friendly way.
 * @param err - The error object containing the error message and field information.
 * @returns The error message component or null if no error.
 */
export const globalError = (err?: IError) => {
  if (err && err?.field) {
    if (err.field === "global") {
      if (err.message) {
        return <p className="error">{err.message}</p>;
      }
      return <p className="error">Something went wrong</p>;
    }
    // return err.message;
  }
  return null;
};
