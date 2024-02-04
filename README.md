# A Basic Nodejs Express Service in TypeScript

## Intro
Please feel free to use this project as a starting point for your next Nodejs Express service to be written in TypeScript.

### Setting the Environment Variables
The project uses the [`dotenv`](https://www.npmjs.com/package/dotenv) package to load environment variables on startup. The `.env` file can be found in the `./config/` folder. Set all the variables __before__ starting the service. Use the template file `.env.TODO` in the `config/` folder, and __rename__ him to `.env`.

## What do we have here?
- All the basic configurations to get you started.
- Testing is set up using ___Jest___ and ___Supertest___ with a basic example.
- The important security middleware every ___Express___ service needs (see [Security](#security)).
- Support for ___AWS Secrets Manager___ (see [AWS Credentials Settings](#aws-credentials-settings)), or if you prefer to use a different service just implement the interface `SecretsRepo`.

## AWS Credentials Settings
The service uses [`aws-sdk` ___v3___](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) package. The credentials for the AWS SDK are configured in the environment variables. All you need to do is to set the following environment variables in the the file `./config/.env`:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Security

### Cross-Origin Region Sharing (CORS)
The service uses the classic [`Cors`](https://www.npmjs.com/package/cors) package to handle cross origin sharing.

### XSS Security

The service uses [`Helmet`](https://www.npmjs.com/package/helmet) to set HTTP Headers, that help protect against reflected XSS payload (non-persistent attacks).

### Request Limit Security

The serivce is set by default to allow 100 requests in a time period of 15 minutes using the [`Express Rate Limit`](https://www.npmjs.com/package/express-rate-limit) module.

### HTTP Request Parameters Pollution Security

This is a minor but necessary addition to prevent an attacker from polluting the HTTP request parameters using [`Hpp`](https://www.npmjs.com/package/hpp) module.
