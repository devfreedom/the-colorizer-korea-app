import jwt from "jsonwebtoken";

function loginValidator(req, res, next) {

  // Parse authorization bearer token from HTTP request header
  // HTTP 요청 헤더로부터 authorization bearer 토큰을 해석합니다.
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  // If userToken is null, block access.
  // 토큰이 없을 경우 진행을 중단합니다.
  if (userToken === "null") {
    console.log("Authorization has been requested but the bearer token is missing. Authorization declined.");
    res.status(400).send("To proceed, please sign in first.");
    return;
  }

  // If userToken is not null, validate the token and extract user ID information.
  // 토큰이 있을 경우 토큰의 유효성을 검증한 후 사용자 정보를 추출합니다.
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.user_id;
    req.currentUserId = user_id;
    next();
  } catch (error) {
    console.log("An error has occured while validating the token.");
    res.status(400).send("Sign-in information is not valid. Please try signing in again.");
    return;
  }
}

export { loginValidator };