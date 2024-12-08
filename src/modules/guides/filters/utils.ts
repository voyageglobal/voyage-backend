import { isEmpty } from "radash"

export function isValidFilterInput<T>(input: T) {
  return !isEmpty(input)
}
