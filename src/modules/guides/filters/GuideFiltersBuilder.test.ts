import { Prisma } from "@prisma/client"
import { GuideFiltersBuilder } from "./GuideFiltersBuilder"

describe("GuideFiltersBuilder", () => {
  it("should return default value", () => {
    const builder = new GuideFiltersBuilder()

    const filters = builder.build()

    expect(filters).toEqual({})
  })

  it("should have default state passed during init", () => {
    const builder = new GuideFiltersBuilder({
      deleted: false,
    })
    expect(builder.build()).toEqual({
      deleted: false,
    })
  })

  it("should have default state after build", () => {
    const builder = new GuideFiltersBuilder({
      deleted: true,
    })
    expect(builder.build()).toEqual({
      deleted: true,
    })

    const result = builder.build()
    expect(result).toEqual({})
  })

  it("should return builder instance if build function hasn't been called", () => {
    const builder = new GuideFiltersBuilder()

    const result = builder.addSearchStringFilter("")

    expect(result).toBeInstanceOf(GuideFiltersBuilder)
  })

  it("should add deleted field to filters", () => {
    const builder = new GuideFiltersBuilder()
    const expectedFilters: Prisma.GuideFindManyArgs["where"] = {
      deleted: false,
    }

    builder.addDeletedFilter(false)
    const result = builder.build()

    expect(result).toEqual(expectedFilters)
  })

  it("should add categories field to filters", () => {
    const builder = new GuideFiltersBuilder()
    const expectedFilters: Prisma.GuideFindManyArgs["where"] = {
      categories: {
        some: {
          key: {
            in: ["nature", "photo"],
          },
        },
      },
    }

    builder.addCategoriesFilter(["nature", "photo"])
    const result = builder.build()

    expect(result).toEqual(expectedFilters)
  })

  it("should add countries field to filters", () => {
    const builder = new GuideFiltersBuilder()
    const countryIds = ["8eaa2524-53cc-4f02-a78b-f04c984ab8de"]
    const expectedFilters: Prisma.GuideFindManyArgs["where"] = {
      countries: {
        some: {
          id: {
            in: countryIds,
          },
        },
      },
    }

    builder.addCountriesFilter(countryIds)
    const result = builder.build()

    expect(result).toEqual(expectedFilters)
  })

  it("should add cities field to filters", () => {
    const builder = new GuideFiltersBuilder()
    const cityIds = ["8eaa2524-53cc-4f02-a78b-f04c984ab8de"]
    const expectedFilters: Prisma.GuideFindManyArgs["where"] = {
      cities: {
        some: {
          id: {
            in: cityIds,
          },
        },
      },
    }

    builder.addCitiesFilter(cityIds)
    const result = builder.build()

    expect(result).toEqual(expectedFilters)
  })

  it("should add search filter", () => {
    const builder = new GuideFiltersBuilder()
    const searchString = "Photo spot"
    const expectedFilters: Prisma.GuideFindManyArgs["where"] = {
      OR: [
        {
          name: {
            startsWith: searchString,
            mode: "insensitive",
          },
        },
        {
          categories: {
            some: {
              name: {
                startsWith: searchString,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    }

    builder.addSearchStringFilter(searchString)
    const result = builder.build()

    expect(result).toEqual(expectedFilters)
  })

  it("should override with the latest added filter", () => {
    const builder = new GuideFiltersBuilder()
    const expectedFilters: Prisma.GuideFindManyArgs["where"] = {
      deleted: false,
    }

    builder.addDeletedFilter(true)
    builder.addDeletedFilter(false)
    const result = builder.build()

    expect(result).toEqual(expectedFilters)
  })
})
