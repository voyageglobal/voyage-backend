import { Injectable } from "@nestjs/common"
import { GuideCategoryDto } from "./dto/guide-category.dto"

@Injectable()
export class GuideCategoriesService {
  async findAll(): Promise<GuideCategoryDto[]> {
    return []
  }
}
