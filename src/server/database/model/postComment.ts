import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import connection from "../connection";

class PostComment extends Model<
  InferAttributes<PostComment>,
  InferCreationAttributes<PostComment>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare post_id: number;
  declare comment: string;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
const InitModel = async (connection: Sequelize) => {
  PostComment.init(
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
      comment: {
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
      modelName: "PostComment",
      tableName: "post_comments",
    }
  );
  console.log("PostComment Model Running");

  await PostComment.sync({ alter: true });
  return PostComment;
};
export { PostComment as PostCommentModelType };
export default await InitModel(connection);
