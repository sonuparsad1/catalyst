const AuthStates = Object.freeze({
  UNKNOWN: "UNKNOWN",
  AUTHENTICATED: "AUTHENTICATED",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  DB_DISABLED: "DB_DISABLED",
  ERROR: "ERROR",
});

const isAuthenticatedState = (state) => state === AuthStates.AUTHENTICATED;

export { AuthStates, isAuthenticatedState };
