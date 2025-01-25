import logger from '@/__shared__/utils/logger';
import { PrismaClient } from '@prisma/client';

export default class PrismaService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getClient(): PrismaClient {
    return this.prisma;
  }

  async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      logger.log('info', 'Prisma connected');
    } catch (error) {
      logger.error('error', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
    logger.info('Disconnected from database');
  }
}

export const prismaService = new PrismaService();
