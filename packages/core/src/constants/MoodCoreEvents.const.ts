export const MoodCoreEvents = {
  USER: {
    CREATED: "core.user.created",
    LOGIN_BY_PASS: "core.user.login_by_pass",
    LOGIN_PASS_CREATED: "core.user.login_pass_created",
    FETCH_ALL: "core.user.fetch_all",
  },

  ITEM: {
    CREATED: "core.item.created",
    FETCH_ALL: "core.item.fetch_all",
    UPDATE: "core.item.update",
    REORDER_LIMI_REACHED: "core.item.reorder_limit_reached",
  },

  ORDER: {
    CREATED: "core.order.created",
    FETCH_ALL: "core.order.fetch_all",
    COMPLETED: "core.order.completed",
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
