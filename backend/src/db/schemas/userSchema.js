import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
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

const UserModel = model("User", UserSchema);

// Activate indexing for better performance with IXSCAN query strategy
// Use `mongoose.explain(executionStats)` method to check verbose information on query process

// COLLSCAN 쿼리 전략 대신에 IXSCAN 쿼리 젼략을 사용할 수 있도록 필드에 indexing 처리를 해줍니다.
// mongoose.explain(executionStats) 메서드를 사용해서 쿼리 결과값이 아닌 쿼리 '수행' 과정에 대한 자세한 정보를 얻을 수 있습니다.

// Create index on primary key `_id`, descending order, unique
// 고유키 역할인 `_id`에다가 인덱싱을 적용합니다. 내림차순을 위해서 "1" 값을, 중복되지 않는 고유값을 부여하기 위해 unique 옵션을 사용합니다.

UserModel.createIndex({ "_id": 1 }, { "unique": true });

export { UserModel };