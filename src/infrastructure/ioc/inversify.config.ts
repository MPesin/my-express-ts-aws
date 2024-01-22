import {Container} from "inversify";
import TYPES from "./types";
import Logger from "../../logs";
import {ConsoleLogger} from "../../logs";
import {SecretsRepo} from "../../secrets";
import AwsSecretsRepo from "../../secrets/AwsSecretsRepo";

const myContainer = new Container();
myContainer.bind<Logger>(TYPES.Logger).to(ConsoleLogger);
myContainer.bind<SecretsRepo>(TYPES.SecretsRepo).to(AwsSecretsRepo);

export default myContainer;