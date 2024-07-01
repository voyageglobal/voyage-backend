import { Injectable } from "@nestjs/common"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
  findOne(id: string) {
    return `This action returns a #${id} user`
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }
}
