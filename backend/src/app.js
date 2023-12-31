import express from "express";

// Import 3rd-party libraries
// 제3자 라이브러리들을 임포트합니다
import cookieParser from "cookie-parser";
import cors from "cors";

// Import in-house modules
// 인하우스 모듈들을 임포트합니다
/*
import { userAuthRouter } from "./routers/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
*/

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
app.use(express.static("/"));

// 기본 페이지
app.get("/", (req, res) => {
  res.send(`<div style="font-family: sans-serif"><h3>The webapp server for The Colorizer Korea is running successfully.</h3><h3>더 컬러라이저 코리아 웹앱 서버가 정상적으로 구동되고 있습니다.</h3></div>`);
});

/*
// [주의] userAuthRouter는 가장 상단에 위치해야 합니다.
// [CAUTION] userAuthRouter needs to be on top.
app.use(userAuthRouter);

// [주의] errorMiddleware는 가장 하단에 위치해야 합니다.
// [CAUTION] errorMiddleware needs to be at the bottom.
app.use(errorMiddleware);
*/

export { app };