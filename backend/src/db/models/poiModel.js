/** 
 * Define DB CRUD models in an object-oriented way
 * DB CRUD 모델을 객체지향적으로 정의합니다.
 */

import { PoiModel } from "../schemas/poiSchema.js";

class Poi {
  static async PLACEHOLDER({ placeholder }) {
    const createdNewPoi = await PoiModel.create({ newPoi });
    return createdNewPoi;
  }

}

export { Poi };
