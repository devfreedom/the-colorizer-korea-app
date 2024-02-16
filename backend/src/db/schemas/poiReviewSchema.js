import { Schema, model } from "mongoose";

const PoiReviewSchema = new Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    poi_index: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

/** 
 * Activate indexing for better performance with IXSCAN query strategy
 * Use `mongoose.explain(executionStats)` method to check verbose information on query process
 * 
 * COLLSCAN 쿼리 전략 대신에 IXSCAN 쿼리 젼략을 사용할 수 있도록 필드에 indexing 처리를 해줍니다.
 * mongoose.explain(executionStats) 메서드를 사용해서 쿼리 결과값이 아닌 쿼리 '수행' 과정에 대한 자세한 정보를 얻을 수 있습니다.
 */

PoiReviewSchema.index({ "poi_index": 1 }, { "unique": true });

// [REFERENCE] Mongoose ODM
// The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Add the exact name of the collection as an extra argument in case of Mongoose not finding the collection.

const PoiReviewModel = model("PoiReview", PoiReviewSchema);

export { PoiReviewModel };