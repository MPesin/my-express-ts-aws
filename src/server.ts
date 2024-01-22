import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import envVars from "./infrastructure/envVars";
import {asyncMvHandler} from "./infrastructure";
import {jwtMiddleware} from "./auth";

const port: number = parseInt(envVars.port);
const app: Express = express();

app.use(cors({
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(hpp());

app.use(asyncMvHandler(jwtMiddleware));


app.get('/', (req, res) => {
  res.send("test")
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`)
})