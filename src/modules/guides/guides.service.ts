import { Injectable } from "@nestjs/common"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"

@Injectable()
export class GuidesService {
  constructor() {}

  create(createGuideDto: CreateGuideDto) {
    return "This action adds a new guide"
  }

  findAll() {
    return `This action returns all guides`
  }

  findOne(id: number) {
    return `This action returns a #${id} guide`
  }

  update(id: number, updateGuideDto: UpdateGuideDto) {
    return `This action updates a #${id} guide`
  }

  remove(id: number) {
    return `This action removes a #${id} guide`
  }
}
