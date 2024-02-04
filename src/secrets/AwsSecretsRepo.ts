import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager";
import SecretsRepo from "./SecretsRepo";
import envVars from "../infrastructure/envVars";
import Logger, {GetLogger} from "../logging";

export default class AwsSecretsRepo implements SecretsRepo {
  private readonly _logger: Logger = GetLogger();

  async getJwtSecret(): Promise<string> {
    const jwtSecret = envVars.jwtSecretName;
    return jwtSecret ? await this.getSecret(jwtSecret) : "";
  }

  async getDbSecret(): Promise<string> {
    const username = envVars.dbUsername || "";
    return username ? await this.getSecret(username) : "";
  }

  private async getSecret(secretName: string): Promise<string> {
    const client = new SecretsManagerClient({
      region: envVars.awsRegion,
    });

    let response;
    try {
      response = await client.send(
          new GetSecretValueCommand({
            SecretId: secretName,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
      );
    } catch (error) {
      this._logger.logError(`Failed to get secret from AWS: ${error}`);
      throw error;
    }
    const secretResponse = JSON.parse(response.SecretString ?? "");
    return secretResponse[secretName];
  }

}
