import { existsSync, lstatSync } from "fs"

export function validateSeedPath(path: string): boolean {
  return existsSync(path) && lstatSync(path).isFile()
}
