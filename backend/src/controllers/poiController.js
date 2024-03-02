import { Poi } from "../db/models/poiModel";
import { PoiService } from "../services/poiService.js";

// [CRUD] CREATE:



// [CRUD] READ: 
const getDistrictPoiList = async (req, res, next) => {
  try {
    const district = req.params.district;
    const result = await Poi.findByDistrict(district);
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).json(`Error: Couldn't fetch point-of-interest information in the specified district. \n ${error}`);
    next(error);
  }
};


// [CRUD] READ: Request detailed information of a single specified POI
const getPoiDetails = async (req, res, next) => {
  try {
    const poi = req.params.index;
    const result = await Poi.findByIndex(poi);
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).json(`Error: Couldn't fetch point-of-interest information in the specified district. \n ${error}`);
    next(error);
  }
}


// [CRUD] UPDATE: 



// [CRUD] DELETE:

export {
  getDistrictPoiList,
  getPoiDetails,
}