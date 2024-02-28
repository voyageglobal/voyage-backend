import { PartialType } from "@nestjs/swagger"
import { CreateGuideDto } from "./create-guide.dto"

export class UpdateGuideDto extends PartialType(CreateGuideDto) {}
