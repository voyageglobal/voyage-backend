import { Country } from "../../countries/entities/country.entity"
import { Image } from "../../images/entities/image.entity"

export class City {
  id: string

  name: string

  description: string

  country: Country

  images: Image[]

  deleted: boolean

  createdAt: Date
  updatedAt: Date
}
