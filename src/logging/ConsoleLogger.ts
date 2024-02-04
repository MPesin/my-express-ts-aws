import Logger from "./Logger";
import LogEntity from "./LogEntity";
import {envVars} from "../infrastructure";
import {LogSeverity} from "./LogSeverity";

export default class ConsoleLogger implements Logger {
  logInfo(msg: string): void {
    const log = this.createLog(LogSeverity.Info, msg);
    console.log(log.toString());
  }

  logWarning(msg: string): void {
    const log = this.createLog(LogSeverity.Warning, msg);
    console.log(log.toString());
  }

  logError(msg: string): void {
    const log = this.createLog(LogSeverity.Error, msg);
    console.log(log.toString());
    console.error(log.toString());
  }

  logDebug(msg: string): void {
    const log = this.createLog(LogSeverity.Debug, msg);
    console.log(log.toString());
  }

  private createLog(severity: LogSeverity, msg: string): LogEntity {
    return new LogEntity(new Date(), envVars.logDomain, severity, msg);
  }
}