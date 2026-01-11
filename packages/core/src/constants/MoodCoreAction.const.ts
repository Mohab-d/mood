export const MoodCoreActions = {
  CREATE_ITEM: "create_item",
  FETCH_ALL_ITEMS: "fetch_all_items",
  UPDATE_ITEM: "update_item",

  CREATE_OPTION: "create_option",
  FETCH_OPTION_FOR_ITEM: "fetch_option_for_item",
  UPDATE_OPTION: "update_option",

  COMPLETE_ORDER: "complete_order",
  FETCH_ALL_ORDERS: "fetch_all_orders",
  PLACE_ORDER: "place_order",

  CREATE_GUEST_PASS: "create_guess_pass",
  CREATE_ONE_TIME_PASS: "create_one_time_pass",
  CREATE_USER: "create_user",
  LOGIN_BY_PASS: "login_by_pass",
} as const;

const adminActions = [
  MoodCoreActions.CREATE_ITEM,
  MoodCoreActions.UPDATE_ITEM,
  MoodCoreActions.CREATE_OPTION,
  MoodCoreActions.UPDATE_OPTION,
];

const workerAction = [
  MoodCoreActions.COMPLETE_ORDER,
  MoodCoreActions.FETCH_ALL_ORDERS,
];

const employeeActions = [""];

const guestActions = [
  MoodCoreActions.FETCH_ALL_ITEMS,
  MoodCoreActions.FETCH_OPTION_FOR_ITEM,
  MoodCoreActions.PLACE_ORDER,
];

export const MoodCoreRolesActions: Record<string, string[]> = {
  admin: [
    ...guestActions,
    ...workerAction,
    ...employeeActions,
    ...adminActions,
  ],
  employee: [...guestActions, ...employeeActions],
  worker: [...guestActions, ...workerAction],
  guest: guestActions,
};
