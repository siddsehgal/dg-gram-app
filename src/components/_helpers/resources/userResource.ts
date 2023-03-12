const UserResource = {
  GetUserAPI: {
    URL: "/api/user",
    METHOD: "GET",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
  SearchUserAPI: {
    URL: "/api/user/search-by-user-name",
    METHOD: "GET",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
  UpdateUserAPI: {
    URL: "/api/user",
    METHOD: "PATCH",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
  FollowUserAPI: {
    URL: "/api/follow",
    METHOD: "POST",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
  UnfollowUserAPI: {
    URL: "/api/follow",
    METHOD: "DELETE",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
};

export { UserResource };
