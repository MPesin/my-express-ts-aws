export default interface SecretsRepo {
  getJwtSecret(): Promise<string>,

  getDbSecret(): Promise<string>
}