import { MoodConfig } from '@mood/core';

export default () => {
  MoodConfig.getInstance().setProperty('secretKey', process.env.SECRET_KEY);

  return {
    pgConnectionString: process.env.PG_CONNECTION_STRING!,
    baseUrl: process.env.BASE_URL,
  };
};
