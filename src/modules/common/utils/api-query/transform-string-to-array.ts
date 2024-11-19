import { chain, sift } from "radash"

const commaSeparatedStringToArrayTransformer = chain(
  (commaSeparatedString: string) => commaSeparatedString,
  commaSeparatedString => commaSeparatedString.split(","),
  stringParts => stringParts.map(stringPart => stringPart.trim()),
  trimmedStringParts => sift(trimmedStringParts),
)

export function transformCommaSeparatedStringToArray(commaSeparatedString: string): string[] {
  const array = commaSeparatedStringToArrayTransformer(commaSeparatedString)

  return array
}
