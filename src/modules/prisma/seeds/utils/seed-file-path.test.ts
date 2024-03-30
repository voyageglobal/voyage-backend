import * as fs from "fs"
import { validateSeedPath } from "./seed-file-path"

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

type LstatSyncResult = ReturnType<typeof fs.lstatSync>

describe("seed-file-path", () => {
  describe("validateSeedPath", () => {
    let existsSyncMock: jest.MockedFunction<typeof fs.existsSync>
    let lstatSyncMock: jest.MockedFunction<typeof fs.lstatSync>

    beforeEach(() => {
      existsSyncMock = fs.existsSync as jest.MockedFunction<typeof fs.existsSync>
      existsSyncMock.mockReset()

      lstatSyncMock = fs.lstatSync as jest.MockedFunction<typeof fs.lstatSync>
      lstatSyncMock.mockReset()
    })

    it("should return true if the path exists and is a file", () => {
      const path = "path/to/file.txt"
      existsSyncMock.mockReturnValue(true)
      lstatSyncMock.mockReturnValueOnce({ isFile: () => true } as LstatSyncResult)

      const result = validateSeedPath(path)

      expect(result).toBe(true)
      expect(existsSyncMock).toHaveBeenCalledWith(path)
      expect(lstatSyncMock).toHaveBeenCalledWith(path)
    })

    it("should return false if the path does not exist", () => {
      const path = "path/to/file.txt"
      existsSyncMock.mockReturnValueOnce(false)

      const result = validateSeedPath(path)

      expect(result).toBe(false)
      expect(existsSyncMock).toHaveBeenCalledWith(path)
      expect(lstatSyncMock).not.toHaveBeenCalled()
    })

    it("should return false if the path exists but is not a file", () => {
      const path = "path/to/file"
      existsSyncMock.mockReturnValue(true)
      lstatSyncMock.mockReturnValue({ isFile: () => false } as LstatSyncResult)

      const result = validateSeedPath(path)

      expect(result).toBe(false)
      expect(existsSyncMock).toHaveBeenCalledWith(path)
      expect(lstatSyncMock).toHaveBeenCalledWith(path)
    })
  })
})
