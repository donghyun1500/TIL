import SQ from 'sequelize';
import {sequelize} from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  url: DataTypes.TEXT,
}, { timestamps: false } 
);

export async function findByUsername(username) {
  return User.findOne({ where: {username }});
  
}

export async function findById(id) {
  return User.findByPk(id)
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}





// import Mongoose from 'mongoose';
// import { useVirtualId } from '../database/database.js';

// const userSchema = new Mongoose.Schema({
//     username: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     url: String,
// });

// useVirtualId(userSchema);
// const User = Mongoose.model('User', userSchema);

// export async function findByUsername(username) {
//     return User.findOne({ username });
// }

// export async function findById(id) {
//     return User.findById(id);
// }

// export async function createUser(user) {
//     return new User(user)
//     .save()
//     .then((data) => data.id)
// }