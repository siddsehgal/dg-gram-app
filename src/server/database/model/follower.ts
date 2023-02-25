import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import connection from "../connection";

class Follower extends Model<
  InferAttributes<Follower>,
  InferCreationAttributes<Follower>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare follower_id: number;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
const InitModel = (connection: Sequelize) => {
  Follower.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      follower_id: {
        type: DataTypes.INTEGER,
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
      modelName: "Follower",
      tableName: "follower",
    }
  );
  console.log("Follower Model Running");

  // await Follower.sync({ alter: true });
  return Follower;
};

export default InitModel(connection);
