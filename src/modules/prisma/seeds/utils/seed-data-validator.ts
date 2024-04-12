import Ajv, { ValidateFunction } from "ajv"

const ajvInstance = new Ajv({
  allErrors: true,
})

export function getSchemaValidator(schema: object): ValidateFunction | null {
  if (typeof schema !== "object" || schema === null) {
    return null
  }

  const validator = ajvInstance.compile(schema)

  return validator
}

// NOTE: schema has type object because ajv force enabled strictNullChecks in tsconfig.json
export function validateSeedData<TData>(data: TData[], schema: object): boolean {
  if (!Array.isArray(data)) {
    return false
  }

  const validate = getSchemaValidator(schema)

  const isValid = data.every(entity => {
    const valid = validate(entity)

    if (!valid) {
      console.log(validate.errors)
    }

    return valid
  })

  return isValid
}
