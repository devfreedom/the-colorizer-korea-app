import { Router } from "express";

// Import middlewares
import { loginValidator } from "../middlewares/loginValidator.js";
import { routeSanitizer } from "../middlewares/routeSanitizer.js";

// Import in-house modules
import { Places } from "../db/models/placesModel.js";
import { PlacesService } from "../services/placesService.js";
import {
  // placeholder1
} from "../controllers/placesController.js";

const PlacesRouter = Router();

PlacesRouter.get(
  "/user/signup",
  // placeholder1,
  async function (req, res, next) {
    try{
      
    }
    catch(error){
      next(error);
    }
});

export { PlacesRouter };