import { Router } from "express";

// Import middlewares
import { loginValidator } from "../middlewares/loginValidator.js";
import { routeSanitizer } from "../middlewares/routeSanitizer.js";
import { upload, uploadProfileImg } from "../middlewares/profileImgUploader.js"

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

// [CREATE] Create a new user account
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

// [CREATE] User sign in
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


// [READ] Request the current logged-in user's account information
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

// [READ] Request a specific user's account information
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


// [UPDATE] Update the current logged-in user's account information
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

// [UPDATE] Change the current logged-in user's password
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

// [UPDATE] Reset the current logged-in user's password
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


// [DELETE] Delete the current logged-in user's account
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


// ----------

// [CREATE] Upload the provided profile image to the database, and send the uploaded image (in base64) and its MIME type back to the client for confirmation.
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