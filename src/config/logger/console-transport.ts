import { format, transports } from "winston"
import { ConsoleTransportOptions } from "winston/lib/winston/transports"

const consoleLoggerConfig: ConsoleTransportOptions = {
  format: format.combine(
    format.cli(),
    format.splat(),
    format.timestamp(),
    format.printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`
    }),
  ),
}

export function getConsoleTransport() {
  return new transports.Console(consoleLoggerConfig)
}
