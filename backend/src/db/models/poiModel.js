/** 
 * Define DB CRUD models in an object-oriented way
 * DB CRUD 모델을 객체지향적으로 정의합니다.
 */

import { PoiModel } from "../schemas/poiSchema.js";

class Poi {
  static async findAllPoiByDistrict(inputDistrict) {
    console.log(inputDistrict)
    const foundDistrictPoi = await PoiModel.find({ subdistrict: inputDistrict });
    console.log(foundDistrictPoi)
    return foundDistrictPoi;
  }
}

export { Poi };
