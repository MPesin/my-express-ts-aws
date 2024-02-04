export default interface Logger {
  logInfo(msg: string): void;

  logWarning(msg: string): void;

  logError(msg: string): void;

  logDebug(msg: string): void;
}