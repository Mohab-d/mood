export class MoodConfig {
  private static _instance: MoodConfig;
  private _configs: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): MoodConfig {
    if (!MoodConfig._instance) {
      this._instance = new MoodConfig();
    }

    return this._instance;
  }

  public getProperty(property: string): any {
    return this._configs[property];
  }

  public setProperty(property: string, value: any): void {
    Object.defineProperty(this._configs, property, { value: value });
  }
}
