import createMoodCoreFactories from '@mood/core';
import { Module } from '@nestjs/common';
import { ProviderToken } from './ProviderToken';

const moodCore = createMoodCoreFactories();

@Module({
  providers: [
    {
      provide: ProviderToken.moodCore,
      useValue: moodCore,
    },
  ],
})
export class MoodCore {}
