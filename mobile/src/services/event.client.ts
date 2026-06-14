import type { EventAgendaItem, EventItem, EventStatus } from '@/types/event';
import { getEventDetailMock, getEventListMock } from './event.mock';
import { request } from './http';

interface EventApiItem {
  id: string;
  title: string;
  coverUrl?: string | null;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  capacityTotal: number;
  fee: string | number;
  status?: string;
  agenda?: unknown;
  details?: string | null;
  isPublished?: boolean;
  _count?: { registrations?: number };
}

function normalizeStatus(status: string | undefined): EventStatus {
  switch ((status || '').toLowerCase()) {
    case 'ongoing':
      return 'ongoing';
    case 'ended':
      return 'ended';
    case 'cancelled':
      return 'cancelled';
    default:
      return 'open';
  }
}

function normalizeAgenda(agenda: unknown): EventAgendaItem[] {
  if (!Array.isArray(agenda)) {
    return [];
  }

  return agenda
    .map((item) => {
      const row = item as Record<string, unknown>;
      const time = typeof row.time === 'string' ? row.time : '';
      const title = typeof row.title === 'string' ? row.title : '';
      if (!time || !title) {
        return null;
      }
      return { time, title };
    })
    .filter((item): item is EventAgendaItem => item !== null);
}

function mapApiEvent(event: EventApiItem): EventItem {
  return {
    id: event.id,
    title: event.title,
    coverUrl: event.coverUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200',
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    organizer: event.organizer,
    capacityTotal: event.capacityTotal,
    registeredCount: event._count?.registrations ?? 0,
    fee: Number(event.fee || 0),
    status: normalizeStatus(event.status),
    agenda: normalizeAgenda(event.agenda),
    details: event.details || '暂无详情',
    isPublished: event.isPublished ?? true,
    isRegistered: false,
  };
}

export async function getEventList(): Promise<EventItem[]> {
  try {
    const response = await request<EventApiItem[]>({ url: '/events' });
    return response.map(mapApiEvent);
  } catch (error) {
    console.warn('[event.client] fallback to mock list', error);
    return getEventListMock();
  }
}

export async function getEventDetail(id: string): Promise<EventItem | undefined> {
  try {
    const response = await request<EventApiItem>({ url: `/events/${id}` });
    return mapApiEvent(response);
  } catch (error) {
    console.warn('[event.client] fallback to mock detail', error);
    return getEventDetailMock(id);
  }
}
