import { MoodConfig } from '@mood/core';

export default () => {
  const moodConfig = MoodConfig.getInstance();
  moodConfig.setProperty('secretKey', process.env.SECRET_KEY);
  moodConfig.setProperty('logLevels', process.env.LOG_LEVELS?.split(',') ?? []);

  return {
    pgConnectionString: process.env.PG_CONNECTION_STRING!,
    baseUrl: process.env.BASE_URL,
  };
};
