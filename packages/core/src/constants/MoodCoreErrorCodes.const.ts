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
    ITEM_DOES_NOT_EXIST: {
      code: "001.002.001",
      message: "Tried to delete an item that does not exist",
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

  // ---- CATEGORY: AUTH: 003
  AUTHN: {
    INVALID_TOKEN: {
      code: "001.003.001",
      message: "Invalid token or expired, maybe it has already been used",
    },
  },
} as const;
