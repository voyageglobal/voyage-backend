import { readFileSync } from "fs"
import { validateSeedPath } from "./seed-file-path"

export function extractSeedDataFromFile<T>(fileLocation: string): T[] {
  if (!validateSeedPath(fileLocation)) {
    throw new Error(`Invalid seed file path: ${fileLocation}`)
  }

  const fileData = readFileSync(fileLocation, "utf-8")
  const data: T[] = JSON.parse(fileData)

  return data
}
