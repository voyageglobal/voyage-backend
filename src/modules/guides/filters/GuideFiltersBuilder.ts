import { Prisma } from "@prisma/client"
import { DEFAULT_FILTER_OUTPUT } from "./constants"
import {
  buildGuideCategoriesFilter,
  buildGuideCitiesFilter,
  buildGuideCountriesFilter,
  buildGuidesSearchStringFilter,
} from "./filters"

export class GuideFiltersBuilder {
  private filtersOutput: Prisma.GuideFindManyArgs["where"] = DEFAULT_FILTER_OUTPUT

  constructor(initialFilters: Prisma.GuideFindManyArgs["where"] = DEFAULT_FILTER_OUTPUT) {
    this.filtersOutput = initialFilters

    return this
  }

  addDeletedFilter(includeDeleted = false): GuideFiltersBuilder {
    this.filtersOutput = {
      ...this.filtersOutput,
      deleted: includeDeleted,
    }

    return this
  }

  addCategoriesFilter(categoryKeys: string[]): GuideFiltersBuilder {
    this.filtersOutput = {
      ...this.filtersOutput,
      ...buildGuideCategoriesFilter(categoryKeys),
    }

    return this
  }

  addCountriesFilter(countryIds: string[]): GuideFiltersBuilder {
    this.filtersOutput = {
      ...this.filtersOutput,
      ...buildGuideCountriesFilter(countryIds),
    }

    return this
  }

  addCitiesFilter(cityIds: string[]): GuideFiltersBuilder {
    this.filtersOutput = {
      ...this.filtersOutput,
      ...buildGuideCitiesFilter(cityIds),
    }

    return this
  }

  addSearchStringFilter(searchString: string): GuideFiltersBuilder {
    this.filtersOutput = {
      ...this.filtersOutput,
      ...buildGuidesSearchStringFilter(searchString),
    }

    return this
  }

  build(): Prisma.GuideFindManyArgs["where"] {
    const filters = this.filtersOutput

    this.flush()

    return filters
  }

  private flush(): void {
    this.filtersOutput = DEFAULT_FILTER_OUTPUT
  }
}
