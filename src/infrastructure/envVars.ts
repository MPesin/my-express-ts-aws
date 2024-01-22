
const envVars = {
  nodeEnvironment: process.env.NODE_ENV ?? "development",
  port: process.env.PORT ?? "8000",
  jwtSecretName: process.env.JWT_SECRET_NAME ?? "",
  dbUsername: process.env.DB_USERNAME ?? "",
  awsRegion: process.env.AWS_REGION ?? "",
  logDomain: process.env.LOG_DOMAIN ?? "VolunteerService"
};

export default envVars;