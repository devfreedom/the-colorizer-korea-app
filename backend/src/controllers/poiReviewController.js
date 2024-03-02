import { PoiReview } from "../db/models/poiReviewModel";
import { PoiReviewService } from "../services/poiReviewService.js";

// [CRUD] CREATE: Post a review of a specified POI
const postPoiReview = async (req, res, next) => {
  try {
    const inputData = req.body;
    const currentUserId = req.currentUserId;
    const poiIndex = req.params.index;

    if(!inputData || !poiIndex || typeof inputData !== 'object'){
      throw new Error("")
    }

    if(!currentUserId){
      throw new Error("Error: The user is not logged in. Please sign in first.")
    }

    if(!req.params.userid){
      throw new Error("Error: The request is not made by logged-in user.")
    }

    // After validation is complete, add the current user's ID into the input data object
    inputData["user_id"] = currentUserId;
    
    const result = await PoiReview.create(inputData);
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).json(`Error: Couldn't post a review. \n ${error}`);
    next(error);
  }
};



// [CRUD] READ: Request reviews of a single specified POI
const getPoiReviews = async (req, res, next) => {
  try {
    const district = req.params.district;
    const result = await Poi.findByDistrict(district);
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).json(`Error: . \n ${error}`);
    next(error);
  }
};


// [CRUD] READ: Request all reviews written by a specified user
const getPoiReviewsByUser = async (req, res, next) => {
  try {
    const poi = req.params.index;
    const result = await Poi.findByIndex(poi);
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).json(`Error: . \n ${error}`);
    next(error);
  }
}



// [CRUD] DELETE: Delete a review specified by review ID
const deletePoiReviewbyId = async (req, res, next) => {
  try {
    
    return;
  } catch (error) {
    res.status(400).json(`Error: . \n ${error}`);
    next(error);
  }
}

export {
  postPoiReview,
  getPoiReviews,
  getPoiReviewsByUser,
  deletePoiReviewbyId
}