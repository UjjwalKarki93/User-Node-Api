import { DataTypes } from "sequelize";
import connection from "./index.js";

const User = connection.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      get() {
        return "+977" + this.getDataValue("phone");
      },
    },
  },
  {
    timestamps: false,
  }
);

export default User;
