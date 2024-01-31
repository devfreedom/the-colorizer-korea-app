import { Schema, model } from "mongoose";

const PoiSchema = new Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    // Physical location attributes
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },

    // Business attributes
    services: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      required: false,
    },
    price_range: {
      type: Number,
      required: false,
    },
    multilingual: {
      type: String,
      required: false,
    },
    multicultural: {
      type: String,
      required: false,
    },
    nearby_transport: {
      type: String,
      required: false,
    },
    business_hours: {
      type: String,
      required: true,
    },
    open_on_weekends: {
      type: Number,
      required: true,
    },
    open_at_night: {
      type: Number,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    social: {
      facebook: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
      x: {
        type: String,
        required: false,
      },
      youtube: {
        type: String,
        required: false,
      },
      other: {
        type: String,
        required: false,
      }
    },

    // Descriptive attributes
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: false,
    },
    endorsed_by: {
      type: String,
      required: false,
    },
    last_updated: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/      // Enforce YYYY-MM-DD date format constraint via RegEx
    },
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

PoiSchema.index({ "name": 1 }, { "unique": true });

const PoiModel = model("Poi", PoiSchema);

export { PoiModel };