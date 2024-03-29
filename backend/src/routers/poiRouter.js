import { Router } from "express";

// Import middlewares
import { loginValidator } from "../middlewares/loginValidator.js";
import { routeSanitizer } from "../middlewares/routeSanitizer.js";

// Import in-house modules
import { Poi } from "../db/models/poiModel.js";
import { PoiService } from "../services/poiService.js";
import {
  getDistrictPoiList,
  getPoiDetails,
} from "../controllers/poiController.js";

const PoiRouter = Router();

// [CRUD] READ: Request detailed information of a single specified POI
PoiRouter.get(
  "/api/places/:index",
  getPoiDetails,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});

// [CRUD] READ: Request all POIs in the specified district, with concise information
PoiRouter.get(
  "/api/districts/:district/places",
  getDistrictPoiList,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});

export { PoiRouter };