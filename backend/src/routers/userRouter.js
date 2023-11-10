import { Router } from "express";

// Import middlewares
import { loginValidator } from "../middlewares/loginValidator.js";
import { routeSanitizer } from "../middlewares/routeSanitizer.js";
import { storage, upload, uploadProfileImg } from "../middlewares/profileImgUploader.js"

// Import in-house modules
import { User } from "../db/models/userModel.js";
import { UserService } from "../services/userService.js";
import {
  signupUser,
  loginUser,
  getCurrentUser,
  getUser,
  updateUser,
  changePassword,
  resetPassword,
  deleteUser
} from "../controllers/userController.js";


const UserRouter = Router();

UserRouter.post(
  "/user/signup",
  signupUser,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});

UserRouter.post(
  "/user/login", 
  loginUser,
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});

/*
[SUSPENDED] Business logic not yet implemented
[일시중지] 적용할 비즈니스 로직이 아직 없습니다.

UserRouter.get("/userlist", async function (req, res, next) {
  // getAllUsers
});
*/

UserRouter.get(
  "/user/current",
  loginValidator,
  getCurrentUser,
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});

UserRouter.get(
  "/users/:userid",
  loginValidator,
  routeSanitizer,
  getUser,
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});

UserRouter.put(
  "/users/:userid",
  loginValidator,
  routeSanitizer,
  updateUser,
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});


UserRouter.put(
  "/user/:userid/password",
  loginValidator,
  routeSanitizer,
  changePassword,
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});


UserRouter.put(
  "/user/resetpassword", 
  loginValidator,
  routeSanitizer, 
  resetPassword,
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});


UserRouter.delete(
  "/user/deletion", 
  loginValidator, 
  routeSanitizer, 
  deleteUser,
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});

// 현재 로그인한 사용자가 입력한 프로필 사진을 데이터베이스 업로드하고, 해당 사진의 base64 문자열과 MIME type으로 프론트엔드에 보내줍니다.
UserRouter.post(
  "/user/:user_id/profileimg", 
  loginValidator,
  routeSanitizer,
  uploadProfileImg,
  upload.single('file'), 
  async function (req, res, next) {
    try{

    }
    catch(error){
      next(error);
    }
});

export { UserRouter };