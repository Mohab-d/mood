// Error code structure: [DOMAIN].[CATEGORY].[SERIAL]

// ----DOMAIN: CORE 001
export const MoodCoreErrorCodes = {
  // ---- CATEGORY: SYSTEM: 001
  SYSTEM: {
    MISSING_SETTING: {
      code: "001.001.001",
      message:
        "Required environement variable or configuration setting is missing",
    },
    UNEXPECTED_ERROR: {
      code: "001.001.002",
      message: "Unexpected error occured",
    },
  },

  // ---- CATEGORY: RULES: 002
  RULE: {
    OPTION_DOES_NOT_EXIST: {
      code: "001.002.001",
      message: "Tried to perform an action on an option that does not exist",
    },
    INCOMPATIBLE: {
      code: "001.002.002",
      message: "Objects can not be grouped",
    },
    NESTGIN_NOT_ALLOWED: {
      code: "001.002.003",
      message: "Can not nest children withing this object",
    },
    MAX_LIMIT: {
      code: "001.002.004",
      message: "Max limit reached",
    },
    NEGATIVE_NOT_ALLOWED: {
      code: "001.002.005",
      message: "Tried to decrement a non-negative value beleow zero",
    },
  },

  // ---- CATEGORY: AUTHENTICATION: 003
  AUTHN: {
    INVALID_TOKEN: {
      code: "001.003.001",
      message: "Invalid token or expired, maybe it has already been used",
    },
  },

  // ---- CATEGORY: BUSINESS: 004
  BUSINESS: {
    INSUFFICIENT_MATERIAL: {
      code: "001.004.001",
      message: "Available qty is not sufficient to complete operation",
    },
  },

  // ---- CATTEGORY: AUTHORIZATION: 005
  AUTHZ: {
    UNAUTHORIZED_ACTION: {
      code: "001.005.001",
      message: "Actor is not authorized to perform the requestion action",
    },
  },

  // ---- CATEGORY: CONTEXT: 006
  CONTEXT: {
    MISSING_DATA: {
      code: "001.006.001",
      message: "Required property is missing from the excecution context",
    },
    VALUE_ALREADY_SET: {
      code: "001.006.002",
      message: "An operation is trying to override a value in the context",
    },
  },
} as const;
