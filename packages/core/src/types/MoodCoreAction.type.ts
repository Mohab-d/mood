import { MoodCoreActions } from "../constants/MoodCoreAction.const";

export type MoodCoreAction =
  (typeof MoodCoreActions)[keyof typeof MoodCoreActions];
