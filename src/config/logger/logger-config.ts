import { LoggerService } from "@nestjs/common"
import { WinstonModule } from "nest-winston"
import "winston-daily-rotate-file"
import { getDailyRotateCombinedFileTransport } from "./combined-file-transport"
import { getConsoleTransport } from "./console-transport"
import { getDailyRotateErrorFileTransport } from "./error-file-transport"

export function getLoggerInstance(): LoggerService {
  const logger = WinstonModule.createLogger({
    transports: [getDailyRotateCombinedFileTransport(), getDailyRotateErrorFileTransport(), getConsoleTransport()],
  })

  return logger
}
