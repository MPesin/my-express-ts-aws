import ConsoleLogger from "./ConsoleLogger";
import Logger from "./Logger";
import {envVars} from "../infrastructure";

export {Logger as default};

let cachedLogger: Logger;

export const GetLogger = (): Logger => cachedLogger ??= CreateLogger();

function CreateLogger() {
  let logger: Logger;
  switch (envVars.environment) {
    case "development":
    case "production":
    case "test":
    default:
      logger = new ConsoleLogger();
  }

  return logger;
}
