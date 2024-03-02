import { Router } from "express";

// Import middlewares
import { loginValidator } from "../middlewares/loginValidator.js";
import { routeSanitizer } from "../middlewares/routeSanitizer.js";

// Import in-house modules
import { PoiReview } from "../db/models/poiReviewModel.js";
import { PoiReviewService } from "../services/poiReviewService.js";
import {
  postPoiReview,
  getPoiReviews,
  getPoiReviewsByUser,
  deletePoiReviewById
} from "../controllers/poiReviewController.js";

const PoiRouter = Router();

// [CRUD] CREATE: Post a review of a specified POI
PoiRouter.post(
  "/api/places/:index/review",
  postPoiReview,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});


// [CRUD] READ: Request reviews of a specified POI
PoiRouter.get(
  "/api/places/:index/reviews",
  getPoiReviews,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});

// [CRUD] READ: Request all reviews written by a specified user
PoiRouter.get(
  "/api/users/:userid/reviews/places",
  getPoiReviewsByUser,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});


// [CRUD] DELETE: Delete a review specified by review ID
PoiRouter.delete(
  "/api/places/reviews/:reviewid",
  deletePoiReviewById,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});
export { PoiRouter };