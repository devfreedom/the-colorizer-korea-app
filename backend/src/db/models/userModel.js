/** 
 * Define DB CRUD models in an object-oriented way
 * DB CRUD 모델을 객체지향적으로 정의합니다.
 */

import { UserModel } from "../schemas/userSchema.js";

class User {

  static async create({ newUser }) {
    const createdNewUser = await UserModel.create({ newUser });
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const foundUser = await UserModel.findOne({ email });
    return foundUser;
  }

  static async findById({ userId }) {
    const foundUser = await UserModel.findOne({ _id: userId });
    return foundUser;
  }

  static async findAll() {
    const foundUsers = await UserModel.find({});
    return foundUsers;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { _id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async delete({ userId }) {
    const user = await UserModel.findOneAndDelete({ _id: userId });
    return user;
  }
  
}

export { User };
