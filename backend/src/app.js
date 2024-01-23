import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

// Custom error handler for future use
// 예비로 마련한 에러 핸들러
import { errorHandler } from "./middlewares/errorHandler.js";

// Use pino-http as a middleware for logging
// 로깅을 위해 pino-http를 미들웨어로 사용합니다.
import { pinoHttpLogger } from "./middlewares/logger.js"
pinoHttpLogger();
app.use(logger());

import { dbConnection } from "./db/connection.js";
import { UserRouter } from "./routers/userRouter.js";
import { PoiRouter } from "./routers/poiRouter.js";

const app = express();

// Use cors middleware to prevent CORS error
// CORS 오류를 방지하기 위해 cors 미들웨어를 사용합니다.
app.use(cors());

// Handles JSON type HTTP requests
// HTTP 요청에 대한 JSON 형식의 응답을 인식하고 핸들링합니다.
app.use(express.json());

// Handles percent-encoded data. `extended: false` option prohibits the use of nested object.
// Percent-encoding을 사용하는 데이터를 인식하고 핸들링합니다. extended 옵션이 false인 경우 nested object를 사용할 수 없습니다.
app.use(express.urlencoded({ extended: true }));

// Serve static files via path
// 정적 파일을 서비스할 수 있게 경로를 지정해줍니다.
app.use(express.static(__dirname));

// Connect to the database
// 데이터베이스에 접속합니다.
dbConnection();

app.get("/", (req, res) => {
  res.send(
    `<div style="font-family: sans-serif">
     <h3>The webapp server for The Colorizer Korea is running successfully.</h3>
     <h3>더 컬러라이저 코리아 웹앱 서버가 정상적으로 구동되고 있습니다.</h3></div>`
  );
});

// [주의] userRouter는 가장 상단에, errorMiddleware는 가장 하단에 위치해야 합니다.
// [CAUTION] userRouter needs to be at the very top, while errorMiddleware needs to be at the very bottom.
app.use(UserRouter);
app.use(PoiRouter);

app.use(errorHandler);

export { app };