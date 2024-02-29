import { PickType } from "@nestjs/swagger"
import { Guide } from "../entities/guide"

export class UpdateGuideDto extends PickType(Guide, [
  "id",
  "name",
  "text",
  "primaryImages",
  "contentImages",
  "countries",
  "cities",
] as const) {}
