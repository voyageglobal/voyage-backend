import { Guide } from "../entities/guide"

export class GuideDto extends Guide {
  id: string

  name: string

  text: string

  deleted: boolean

  createdAt: Date

  updatedAt: Date
}
