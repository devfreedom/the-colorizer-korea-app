// import is from "@sindresorhus/is";

import { Router } from "express";

// Import middlewares
import { loginValidator } from "../middlewares/loginValidator.js";
import { routeSanitizer } from "../middlewares/routeSanitizer.js";
import { storage, upload, uploadProfileImg } from "../middlewares/profileImgUploader.js"

// Import utilities

// Import in-house modules
import { User } from "../db/models/userModel.js";
import { userAuthService } from "../services/userAuthService.js";


const userAuthRouter = Router();

userAuthRouter.post(
  "/user/signup", 
  async function (req, res, next) {
  // signupUser
});

userAuthRouter.post(
  "/user/login", 
  async function (req, res, next) {
  // loginUser
});

/*
[SUSPENDED] Business logic not yet implemented
[일시중지] 적용할 비즈니스 로직이 아직 없습니다.

userAuthRouter.get("/userlist", async function (req, res, next) {
  // getAllUsers
});
*/

userAuthRouter.get(
  "/user/current",
  loginValidator,
  async function (req, res, next) {
  // getCurrentUser
});

userAuthRouter.get(
  "/users/:userid",
  loginValidator,
  async function (req, res, next) {
  // getUser
});

userAuthRouter.put(
  "/users/:userid",
  loginValidator,
  routeSanitizer,
  async function (req, res, next) {
  // updateUser
});


userAuthRouter.put(
  "/user/:userid/password",
  loginValidator,
  routeSanitizer,
  async function (req, res, next) {
  // changePassword

});


userAuthRouter.put(
  "/user/resetpassword", 
  loginValidator,
  routeSanitizer, 
  async function (req, res, next) {
  // resetPassword
});


userAuthRouter.delete(
  "/user/deletion", 
  loginValidator, 
  routeSanitizer, 
  async function (req, res, next) {
  // deleteUser
});

// 현재 로그인한 사용자가 입력한 프로필 사진을 데이터베이스 업로드하고, 해당 사진의 base64 문자열과 MIME type으로 프론트엔드에 보내줍니다.
userAuthRouter.post(
  "/user/:user_id/profileimg", 
  loginValidator,
  routeSanitizer,
  upload.single('file'), 
  async function (req, res, next) {
  // profileImgUploader
});

export { userAuthRouter };