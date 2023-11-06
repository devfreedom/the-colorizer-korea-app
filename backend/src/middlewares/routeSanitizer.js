import { body, param } from "express-validator";

// [SECURITY] Sanitize incoming req.body and req.param as a middleware, by using express-validator
// [보안] req.body와 req.param의 모든 요소들을 sanitize 하는 미들웨어를 express-validator를 사용해 만들어 라우터에 적용합니다.

exports.routeSanitizer = [
  body('**').escape(),
  param('**').escape(),
];
