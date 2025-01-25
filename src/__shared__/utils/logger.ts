import chalk, { ChalkInstance } from 'chalk';
import winston from 'winston';

/**
 * Enum para os níveis de log.
 */
enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

/**
 * Mapeamento de cores para os níveis de log.
 */
const LogColors: Record<LogLevel, ChalkInstance> = {
  [LogLevel.INFO]: chalk.blue,
  [LogLevel.WARN]: chalk.yellow,
  [LogLevel.ERROR]: chalk.red,
  [LogLevel.DEBUG]: chalk.cyan,
};

/**
 * Obtém o nível de log com base em uma string.
 * Caso o nível seja inválido, retorna "info" como padrão.
 */
function getLevelBasedOnString(level: string): LogLevel {
  if (Object.values(LogLevel).includes(level as LogLevel)) {
    return level as LogLevel;
  }
  return LogLevel.INFO;
}

/**
 * Aplica a cor correta no log com base no nível.
 */
function getChalkBasedOnLog(level: string, message: unknown): string {
  const logLevel = getLevelBasedOnString(level);
  const color = LogColors[logLevel];
  return color(String(message));
}

/**
 * Formato de log customizado com cores e timestamp.
 */
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  const formattedLevel = getLevelBasedOnString(level);
  return chalk.bgBlack(
    `${chalk.yellow(timestamp)} ${getChalkBasedOnLog(formattedLevel, message)}`,
  );
});

/**
 * Transporte para console com formato customizado.
 */
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.timestamp(), logFormat),
});

/**
 * Logger configurado com níveis customizados e transporte para console.
 */
const logger = winston.createLogger({
  levels: Object.fromEntries(
    Object.values(LogLevel).map((level, index) => [level, index]),
  ),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [consoleTransport],
});

export default logger;
