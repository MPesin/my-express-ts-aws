import AwsSecretsRepo from "./AwsSecretsRepo";
import SecretsRepo from "./SecretsRepo";

export {default as SecretsRepo} from '../secrets/SecretsRepo';

export function CreateSecretsRepo(): SecretsRepo {
  return new AwsSecretsRepo();
}