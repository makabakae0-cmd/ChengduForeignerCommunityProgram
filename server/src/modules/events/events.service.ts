import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        coverUrl: dto.coverUrl,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        location: dto.location,
        organizer: dto.organizer,
        capacityTotal: dto.capacityTotal,
        fee: new Prisma.Decimal(dto.fee),
        status: dto.status,
        agenda: dto.agenda as Prisma.InputJsonValue | undefined,
        details: dto.details,
        isPublished: dto.isPublished ?? false,
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { startTime: 'asc' },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        registrations: {
          select: {
            id: true,
            userId: true,
            name: true,
            phone: true,
            status: true,
            checkedIn: true,
            checkedInAt: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        reviews: true,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    return event;
  }

  async update(id: string, dto: UpdateEventDto) {
    await this.ensureExists(id);

    return this.prisma.event.update({
      where: { id },
      data: {
        title: dto.title,
        coverUrl: dto.coverUrl,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        location: dto.location,
        organizer: dto.organizer,
        capacityTotal: dto.capacityTotal,
        fee: dto.fee !== undefined ? new Prisma.Decimal(dto.fee) : undefined,
        status: dto.status,
        agenda: dto.agenda as Prisma.InputJsonValue | undefined,
        details: dto.details,
        isPublished: dto.isPublished,
      },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.event.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.event.findUnique({ where: { id }, select: { id: true } });
    if (!exists) {
      throw new NotFoundException(`Event ${id} not found`);
    }
  }
}
