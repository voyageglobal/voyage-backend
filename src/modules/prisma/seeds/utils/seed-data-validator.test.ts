import { getSchemaValidator, validateSeedData } from "./seed-data-validator"

describe("seed-data-validator", () => {
  describe("getSchemaValidator", () => {
    it("should return null if schema wasn't provided", () => {
      const validator = getSchemaValidator(null)

      expect(validator).toBeNull()
    })

    it("should return validate function", () => {
      const validator = getSchemaValidator({ type: "object" })

      expect(validator).toBeDefined()
    })
  })

  describe("validateSeedInputData", () => {
    it("should return false if input isn't array", () => {
      const data = { name: "John Doe" } as unknown as []
      const schema = {
        type: "object",
        properties: {
          name: { type: "string", nullable: false },
        },
      }

      const isValid = validateSeedData(data, schema)

      expect(isValid).toBeFalsy()
    })

    it("should return true if data is valid", () => {
      const data = [{ name: "John Doe" }]
      const schema = {
        type: "object",
        properties: {
          name: { type: "string", nullable: false },
        },
      }

      const isValid = validateSeedData(data, schema)

      expect(isValid).toBeTruthy()
    })

    it("should return false if data is invalid", () => {
      const data = [{ name: 123 }]
      const schema = {
        type: "object",
        properties: {
          name: { type: "string", nullable: false },
        },
      }

      const isValid = validateSeedData(data, schema)

      expect(isValid).toBeFalsy()
    })
  })
})
