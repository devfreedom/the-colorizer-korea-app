import { Poi } from "../db/models/poiModel";
import { PoiService } from "../services/poiService.js";

// [CRUD] CREATE:

const PLACEHOLDER = async (req, res, next) => {
  try {
    return;
  } catch (error) {
    next(error);
  }
};



// [CRUD] READ: 

const getDistrictPoiList = async (req, res, next) => {
  try {
    const district = req.params.district;
    const result = await Poi.findAllPoiByDistrict(district);
    console.log(result)
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).json(`Error: Couldn't fetch point-of-interest information in the specified district. \n ${error}`);
    next(error);
  }
};


// [CRUD] UPDATE: 



// [CRUD] DELETE:

export {
  getDistrictPoiList,
}