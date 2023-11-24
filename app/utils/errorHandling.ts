import { IError } from "@/interface/error";

export function isApiError(x: unknown): x is IError {
  if (x && typeof x === "object" && "field" in x) {
    return true;
  }
  return false;
}
