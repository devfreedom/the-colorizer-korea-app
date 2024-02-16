/** 
 * Define DB CRUD models in an object-oriented way
 * DB CRUD 모델을 객체지향적으로 정의합니다.
 */

import { PoiReviewModel } from "../schemas/poiReviewSchema.js";

class PoiReview {

  static async create(inputReview) {
    const createdReview = await PoiReviewModel.create(inputReview);
    return createdReview;
  }

  static async findByPoi(inputIndex) {
    const foundReviews = await PoiReviewModel.find({ index: inputIndex });
    return foundReviews;
  }

  static async findByUserId(inputUserId) {
    const foundReviews = await PoiReviewModel.find({ user_id: inputUserId });
    return foundReviews;
  }

  static async delete(inputIndex) {
    const deletedReview = await PoiReviewModel.findOneAndDelete({ index: inputIndex });
    return deletedReview;
  }

}

export { PoiReview };
