import * as fs from "fs"
import { extractSeedDataFromFile } from "./seed-file"
import { validateSeedPath } from "./seed-file-path"

jest.mock("./seed-file-path", () => {
  return {
    __esModule: true,
    validateSeedPath: jest.fn(),
  }
})

jest.mock("fs", () => {
  const actualFs = jest.requireActual("fs")

  return {
    __esModule: false,
    ...actualFs,
    existsSync: jest.fn(),
    lstatSync: jest.fn(),
    readFileSync: jest.fn(),
  }
})

describe("seed-file", () => {
  let validateSeedPathMock: jest.MockedFunction<typeof validateSeedPath>

  beforeEach(() => {
    validateSeedPathMock = validateSeedPath as jest.MockedFunction<typeof validateSeedPath>
    validateSeedPathMock.mockReset()
  })

  describe("extractSeedDataFromFile", () => {
    let readFileSyncMock: jest.MockedFunction<typeof fs.readFileSync>

    beforeEach(() => {
      readFileSyncMock = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>
      readFileSyncMock.mockReset()
    })

    it("should throw an error if the path is invalid", () => {
      const path = "path/to/file.txt"
      validateSeedPathMock.mockReturnValueOnce(false)

      expect(() => extractSeedDataFromFile(path)).toThrowError(`Invalid seed file path: ${path}`)
      expect(readFileSyncMock).not.toHaveBeenCalled()
    })

    it("should return the parsed data from the file", () => {
      const path = "path/to/file.txt"
      const fileData = "[]"
      validateSeedPathMock.mockReturnValueOnce(true)
      readFileSyncMock.mockReturnValueOnce(fileData)

      const result = extractSeedDataFromFile(path)

      expect(result).toEqual([])
      expect(readFileSyncMock).toHaveBeenCalled()
    })
  })
})
