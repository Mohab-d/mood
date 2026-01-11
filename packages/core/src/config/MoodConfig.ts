import { MoodCoreConfigs } from "../constants/MoodCoreConfigs.const";

export class MoodConfig {
  private static _instance: MoodConfig;
  private _configs: Record<string, any> = {};
  private _initCalled: boolean = false;

  private constructor() {}

  public static getInstance(): MoodConfig {
    if (!MoodConfig._instance) {
      this._instance = new MoodConfig();
    }

    return this._instance;
  }

  public getProperty<K extends keyof MoodCoreConfigs>(
    property: K,
  ): MoodCoreConfigs[K] {
    return this._configs[property];
  }

  public setProperty<K extends keyof MoodCoreConfigs>(
    property: K,
    value: MoodCoreConfigs[K],
  ): void {
    Object.defineProperty(this._configs, property, { value: value });
  }

  public init(configs: MoodCoreConfigs): MoodConfig {
    if (this._initCalled) {
      return this;
    }

    this._configs = { ...configs };
    this._initCalled = true;
    return this;
  }
}
