import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import connection from "../connection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare full_name: string;
  declare user_name: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare phoneNumber: CreationOptional<string>;
  declare OTP: number;
  declare isEmailVerified: CreationOptional<boolean>;
  declare lastLoginAt: CreationOptional<number>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
const InitModel = async (connection: Sequelize) => {
  User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      OTP: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: "User",
      tableName: "users",
    }
  );
  console.log("User Model Running");

  // await User.sync({ alter: true });
  return User;
};
export { User as UserModelType };
export default await InitModel(connection);
