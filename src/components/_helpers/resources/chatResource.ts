const ChatResource = {
  GetUserChatAPI: {
    URL: "/api/chat",
    METHOD: "GET",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },

  GetChatUserAPI: {
    URL: "/api/chat/users",
    METHOD: "GET",
    PROTECTED: true,
    message: {
      error: true,
      success: false,
    },
  },
};
export { ChatResource };
