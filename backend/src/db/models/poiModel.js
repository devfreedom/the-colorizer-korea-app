/** 
 * Define DB CRUD models in an object-oriented way
 * DB CRUD 모델을 객체지향적으로 정의합니다.
 */

import { PoiModel } from "../schemas/poiSchema.js";

class Poi {

  static async findByDistrict(inputDistrict) {
    const foundDistrictPois = await PoiModel.find({ subdistrict: inputDistrict });
    return foundDistrictPois;
  }

  static async findByIndex(inputIndex) {
    const foundSinglePoi = await PoiModel.findOne({ index: inputIndex });
    return foundSinglePoi;
  }
  
}

export { Poi };
