const AuthResource = {
  SignInAPI: {
    URL: "/api/auth/signin",
    METHOD: "POST",
    PROTECTED: false,
    message: {
      success: false,
      error: true,
    },
  },
  SignUpAPI: {
    URL: "/api/auth/signup",
    METHOD: "POST",
    PROTECTED: false,
    message: {
      success: false,
      error: true,
    },
  },
  CheckLoginAPI: {
    URL: "/api/auth/check-login",
    METHOD: "GET",
    PROTECTED: true,
    message: {
      success: false,
      error: false,
    },
  },
  VerifyOtpAPI: {
    URL: "/api/auth/verify-otp",
    METHOD: "POST",
    PROTECTED: true,
    message: {
      success: false,
      error: true,
    },
  },
  ResendOtpAPI: {
    URL: "/api/auth/resend-otp",
    METHOD: "POST",
    PROTECTED: true,
    message: {
      success: false,
      error: true,
    },
  },
  UpdateEmailAPI: {
    URL: "/api/auth/update-email",
    METHOD: "PATCH",
    PROTECTED: true,
    message: {
      success: false,
      error: true,
    },
  },
  UpdateUserNameAPI: {
    URL: "/api/auth/update-user-name",
    METHOD: "PATCH",
    PROTECTED: true,
    message: {
      success: false,
      error: true,
    },
  },
  SocketAPI: {
    URL: "/api/socket",
    METHOD: "GET",
    PROTECTED: true,
    message: {
      success: false,
      error: false,
    },
  },
};

export { AuthResource };
