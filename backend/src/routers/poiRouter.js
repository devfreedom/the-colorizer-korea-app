import { Router } from "express";

// Import middlewares
import { loginValidator } from "../middlewares/loginValidator.js";
import { routeSanitizer } from "../middlewares/routeSanitizer.js";

// Import in-house modules
import { Poi } from "../db/models/poiModel.js";
import { PoiService } from "../services/poiService.js";
import {
  // placeholder1
} from "../controllers/poiController.js";

const PoiRouter = Router();

// [READ] Request detailed information of a single specified POI
PoiRouter.get(
  "/places/:poino",
  getPoiInfo,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});

// [READ] Request all POIs in the specified district, with concise information
PoiRouter.get(
  "/places/:district/",
  getDistrictPoiList,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});

export { PoiRouter };