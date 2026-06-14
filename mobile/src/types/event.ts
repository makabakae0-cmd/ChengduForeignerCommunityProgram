export type EventStatus = 'open' | 'ongoing' | 'ended' | 'cancelled';

export interface EventAgendaItem {
  time: string;
  title: string;
}

export interface EventItem {
  id: string;
  title: string;
  coverUrl: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  capacityTotal: number;
  registeredCount: number;
  fee: number;
  status: EventStatus;
  agenda: EventAgendaItem[];
  details: string;
  isPublished: boolean;
  isRegistered?: boolean;
}
