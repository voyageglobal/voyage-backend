import { format, transports } from "winston"
import { LOGGER_DATE_FORMAT, MAX_LOG_FILE_AGE } from "./constants"

export function getDailyRotateErrorFileTransport() {
  return new transports.DailyRotateFile({
    filename: `logs/%DATE%-combined.log`,
    level: "error",
    format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
    datePattern: LOGGER_DATE_FORMAT,
    zippedArchive: false,
    maxFiles: MAX_LOG_FILE_AGE,
  })
}
