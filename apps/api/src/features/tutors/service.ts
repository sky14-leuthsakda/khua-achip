import type { Tutor } from './types';

export const tutorsData: Tutor[] = [
  {
    id: 't1',
    init: 'ວລ',
    name: 'ອາຈານ ວັນນະລີ',
    subj: 'ໂປຣແກຣມມິ່ງ',
    years: 6,
    rating: 4.8,
    students: 62,
    price: '80,000 LAK/ຊົ່ວໂມງ',
    mode: 'ອອນລາຍ'
  },
  {
    id: 't2',
    init: 'ສພ',
    name: 'ອາຈານ ສົມພອນ',
    subj: 'ພາສາອັງກິດ',
    years: 5,
    rating: 4.9,
    students: 88,
    price: '50,000 LAK/ຊົ່ວໂມງ',
    mode: 'ອອນລາຍ'
  },
  {
    id: 't3',
    init: 'ບມ',
    name: 'ອາຈານ ບຸນມີ',
    subj: 'ຄະນິດສາດ',
    years: 8,
    rating: 4.7,
    students: 120,
    price: '60,000 LAK/ຊົ່ວໂມງ',
    mode: 'ອອຟລາຍ'
  }
];

export class TutorsService {
  async getAll(): Promise<Tutor[]> {
    return tutorsData;
  }

  async getById(id: string): Promise<Tutor | null> {
    return tutorsData.find((t) => t.id === id) || null;
  }
}

export const tutorsService = new TutorsService();
