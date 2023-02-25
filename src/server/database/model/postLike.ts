import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import connection from "../connection";

class PostLike extends Model<
  InferAttributes<PostLike>,
  InferCreationAttributes<PostLike>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare post_id: number;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
const InitModel = async (connection: Sequelize) => {
  PostLike.init(
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
      post_id: {
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
      modelName: "PostLike",
      tableName: "post_likes",
    }
  );
  console.log("PostLike Model Running");

  await PostLike.sync({ alter: true });
  return PostLike;
};

export { PostLike as PostLikeModelType };
export default await InitModel(connection);
