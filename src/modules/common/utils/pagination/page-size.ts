import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../../constants"

export function getValidPageSize({
  pageSize,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  maxPageSize = MAX_PAGE_SIZE,
}: {
  pageSize: number | null | undefined
  defaultPageSize?: number
  maxPageSize?: number
}): number {
  let validPageSize = 0

  if (!pageSize) {
    return defaultPageSize
  }

  if (pageSize <= 0) {
    return defaultPageSize
  }

  validPageSize = pageSize > maxPageSize ? maxPageSize : pageSize

  return validPageSize
}
