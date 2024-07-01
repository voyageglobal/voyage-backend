import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"
import { JwtAuthGuard } from "../auth/jwt-auth-guard"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UsersService } from "./users.service"

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiOkResponse({
    description: "The user has been successfully retrieved.",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  @ApiOkResponse({
    description: "The user has been successfully updated.",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }
}
