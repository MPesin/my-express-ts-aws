import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import {rateLimit} from 'express-rate-limit';

import {envVars} from "./infrastructure";
import Logger, {GetLogger} from "./logs";
import {asyncMiddleware, errorsMiddleware, authMiddleware} from "./middlewares";

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
});
app.use(limiter);
app.use(asyncMiddleware(authMiddleware));
app.use(errorsMiddleware);

app.get('/', (req, res) => {
  res.send("test")
});

app.listen(port, () => {
  logger.logInfo(`now listening on port ${port}`);
})
