export const MoodEvents = {
  USER: {
    CREATED: "core.user.created",
    LOGIN_BY_PASS: "core.user.login_by_pass",
    LOGIN_PASS_CREATED: "core.user.login_pass_created",
  },

  ITEM: {
    CREATED: "core.item.created",
    FETCH_ALL: "core.item.fetch_all"
  },

  ORDER: {
    CREATED: "core.order.created",
    FETCH_ALL: "core.order.fetch_all"
  }
} as const;
