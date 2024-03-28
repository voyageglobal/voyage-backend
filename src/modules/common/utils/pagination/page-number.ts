import { DEFAULT_PAGE, MAX_PAGE } from "../../constants"

export function getValidPageNumber({
  page,
  defaultPage = DEFAULT_PAGE,
  maxPage = MAX_PAGE,
}: {
  page: number | null | undefined
  defaultPage?: number
  maxPage?: number
}) {
  let validPage = 0

  if (!page) {
    return defaultPage
  }

  if (page <= 0) {
    return defaultPage
  }

  validPage = page > maxPage ? maxPage : page

  return validPage
}
