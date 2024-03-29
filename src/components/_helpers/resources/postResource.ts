const PostResource = {
  CreatePostAPI: {
    URL: "/api/post",
    METHOD: "POST",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
  GetPostAPI: {
    URL: "/api/post",
    METHOD: "GET",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
  DeletePostAPI: {
    URL: "/api/post",
    METHOD: "DELETE",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },

  LikePostAPI: {
    URL: "/api/post/like",
    METHOD: "POST",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
  RemovePostLikeAPI: {
    URL: "/api/post/like",
    METHOD: "DELETE",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
};
export { PostResource };
