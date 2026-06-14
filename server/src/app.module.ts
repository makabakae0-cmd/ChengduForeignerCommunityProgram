import { Module } from '@nestjs/common';
import { EventsModule } from './modules/events/events.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, EventsModule],
})
export class AppModule {}
