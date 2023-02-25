import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  Sequelize,
  NonAttribute,
} from "sequelize";
import connection from "../connection";
import usersRoom, { UsersRoomType } from "./usersRoom";

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;
  declare room_id: number;
  declare from: number;
  declare message: string;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare room_data: NonAttribute<UsersRoomType>;
}
const InitModel = async (connection: Sequelize) => {
  Chat.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      from: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      timestamps: true,
      sequelize: connection,
      modelName: "Chat",
      tableName: "chats",
    }
  );

  Chat.belongsTo(usersRoom, {
    as: "room_data",
    foreignKey: "room_id",
    targetKey: "id",
  });
  console.log("Chat Model Running");

  await Chat.sync({ alter: true });
  return Chat;
};

export default await InitModel(connection);
