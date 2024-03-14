import { OmitType, PartialType } from "@nestjs/swagger"
import { Guide } from "../entities/guide.entity"

export class GuideDto extends PartialType(OmitType(Guide, ["deleted"] as const)) {}
