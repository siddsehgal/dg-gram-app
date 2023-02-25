import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  Sequelize,
  NonAttribute,
  Association,
} from "sequelize";
import { PostLikeModelType } from "./postLike";
import connection from "../connection";
import { PostCommentModelType } from "./postComment";
import { UserModelType } from "./user";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare content: string;
  declare post_likes: NonAttribute<PostLikeModelType[]>;
  declare post_comments: NonAttribute<PostCommentModelType[]>;
  declare user_data: NonAttribute<UserModelType>;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}

const InitModel = async (connection: Sequelize) => {
  Post.init(
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
      content: {
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
      modelName: "Post",
      tableName: "posts",
    }
  );
  Post.hasMany(PostLikeModelType, {
    sourceKey: "id",
    foreignKey: "post_id",
    as: "post_likes",
  });
  Post.hasMany(PostCommentModelType, {
    sourceKey: "id",
    foreignKey: "post_id",
    as: "post_comments",
  });
  Post.belongsTo(UserModelType, {
    foreignKey: "user_id",
    as: "user_data",
  });

  console.log("Post Model Running");

  // await Post.sync({ alter: true });
  return Post;
};
export { Post as PostModelType };
export default await InitModel(connection);
