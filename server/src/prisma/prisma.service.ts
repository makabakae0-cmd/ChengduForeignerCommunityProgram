import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    // Allow API boot without a configured database during early MVP frontend work.
    if (!process.env.DATABASE_URL) {
      console.warn('[PrismaService] DATABASE_URL is missing, skipping database connection.');
      return;
    }
    await this.$connect();
  }
}
