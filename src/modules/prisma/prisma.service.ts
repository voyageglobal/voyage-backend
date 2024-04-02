import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly logger: Logger) {
    super()
  }

  async onModuleInit() {
    try {
      await this.$connect()
    } catch (e) {
      console.error(e)
      this.logger.error(`Failed to connect to the database: ${e.toString()}`)
      throw e
    }
  }
}
