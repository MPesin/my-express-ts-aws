import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import { rateLimit } from 'express-rate-limit';

import {envVars} from "./infrastructure";
import {asyncMvHandler} from "./infrastructure";
import {JwtService} from "./auth";
import {AwsSecretsRepo} from "./secrets";
import Logger, {GetLogger} from "./logs";

const logger: Logger = GetLogger();
const port: number = parseInt(envVars.port);
const app: Express = express();

app.use(cors({
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

app.use(limiter)

const jwtService: JwtService = new JwtService(new AwsSecretsRepo());
app.use(asyncMvHandler(jwtService.jwtMiddleware));

app.get('/', (req, res) => {
  res.send("test")
});

app.listen(port, () => {
  logger.logInfo(`now listening on port ${port}`);
})