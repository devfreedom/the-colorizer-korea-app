import { Schema, model } from "mongoose";

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema(
  {
    // To prepare for migration to relational database, do not use MongoDB-only `_id` ObjectId as primary key.
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
      default: "",
    },
    social: {
      type: Object,
      required: false,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    imgBase64:{
      type: String,
      required: false,
    },
    isPasswordReset: {
      type: Boolean,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

// Use `id` field with auto-incrementing sequential numbers as a unique user identifier, which is created and managed by mongoose-sequence.
UserSchema.plugin(AutoIncrement, { inc_field: 'id' });


/** 
 * Activate indexing for better performance with IXSCAN query strategy
 * Use `mongoose.explain(executionStats)` method to check verbose information on query process
 * 
 * COLLSCAN 쿼리 전략 대신에 IXSCAN 쿼리 젼략을 사용할 수 있도록 필드에 indexing 처리를 해줍니다.
 * mongoose.explain(executionStats) 메서드를 사용해서 쿼리 결과값이 아닌 쿼리 '수행' 과정에 대한 자세한 정보를 얻을 수 있습니다.
 */

UserSchema.index({ "email": 1 }, { "unique": true });

const UserModel = model("User", UserSchema);

export { UserModel };