import type { EventItem } from '@/types/event';

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-weekend-market',
    title: '周末市集·桐梓林站',
    coverUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200',
    startTime: '2026-04-05T14:00:00+08:00',
    endTime: '2026-04-05T18:00:00+08:00',
    location: '欧洲风情街',
    organizer: '桐梓林社区居委会',
    capacityTotal: 100,
    registeredCount: 55,
    fee: 0,
    status: 'open',
    agenda: [
      { time: '14:00-14:30', title: '签到' },
      { time: '14:30-16:00', title: '市集自由逛' },
      { time: '16:00-17:00', title: '手作体验' },
      { time: '17:00-18:00', title: '抽奖环节' },
    ],
    details: '本次市集包含轻食、文创与互动小游戏，欢迎中外居民一起参与。',
    isPublished: true,
    isRegistered: true,
  },
  {
    id: 'evt-english-corner',
    title: '英语角：聊聊旅行',
    coverUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200',
    startTime: '2026-04-07T19:00:00+08:00',
    endTime: '2026-04-07T21:00:00+08:00',
    location: '桐梓林社区邻里中心',
    organizer: '社区志愿者团队',
    capacityTotal: 60,
    registeredCount: 60,
    fee: 0,
    status: 'open',
    agenda: [
      { time: '19:00-19:20', title: '破冰交流' },
      { time: '19:20-20:20', title: '旅行话题讨论' },
      { time: '20:20-21:00', title: '小组分享' },
    ],
    details: '围绕旅行体验进行英语口语交流，适合外籍居民与本地居民互相认识。',
    isPublished: true,
  },
  {
    id: 'evt-photo-walk',
    title: '春季街拍漫步',
    coverUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200',
    startTime: '2026-04-11T10:00:00+08:00',
    endTime: '2026-04-11T12:00:00+08:00',
    location: '人民公园南门',
    organizer: '社区摄影志愿组',
    capacityTotal: 30,
    registeredCount: 30,
    fee: 0,
    status: 'ended',
    agenda: [
      { time: '10:00-10:20', title: '集合与主题说明' },
      { time: '10:20-11:40', title: '街拍漫步' },
      { time: '11:40-12:00', title: '作品交流' },
    ],
    details: '围绕春季主题进行城市漫步拍摄，活动已结束，可查看回顾。',
    isPublished: true,
  },
];

export async function getEventListMock(): Promise<EventItem[]> {
  return Promise.resolve(MOCK_EVENTS);
}

export async function getEventDetailMock(id: string): Promise<EventItem | undefined> {
  return Promise.resolve(MOCK_EVENTS.find((item) => item.id === id));
}
