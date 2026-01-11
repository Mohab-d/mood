export const MoodCoreEvents = {
  USER: {
    CREATE: "core.user.created",
    LOGIN_BY_PASS: "core.user.login_by_pass",
    LOGIN_PASS_CREATED: "core.user.login_pass_created",
    FETCH_ALL: "core.user.fetch_all",
  },

  ITEM: {
    CREATE: "core.item.created",
    FETCH_ALL: "core.item.fetch_all",
    UPDATE: "core.item.updated",
    CONSUME: "core.item.consumed",
    REORDER_LIMI_REACHED: "core.item.reorder_limit_reached",
  },

  OPTION: {
    CREATE: "core.option.created",
    UPDATE: "core.option.updated",
    FETCH: "core.option.fetch",
  },

  ORDER: {
    CREATE: "core.order.created",
    FETCH_ALL: "core.order.fetch_all",
    COMPLETE: "core.order.completed",
  },

  AUTHZ: {
    AUTHORIZE: "core.authz.authorize",
    REVOKE: "core.authz.revoke",
  },
} as const;

type DeepValues<T> = T extends object
  ? T extends { [key: string]: infer U }
    ? U extends string
      ? U
      : DeepValues<U>
    : never
  : never;

export type MoodCoreEventType = DeepValues<typeof MoodCoreEvents>;
