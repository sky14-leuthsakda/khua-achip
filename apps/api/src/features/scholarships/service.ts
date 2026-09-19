import type { Scholarship } from './types';

export const scholarshipsData: Scholarship[] = [
  {
    id: 's1',
    name: 'ASEAN Digital Scholarship',
    country: 'ສິງກະໂປ',
    level: 'ປະລິນຍາຕີ',
    funded: 'ທຶນເຕັມ',
    match: 88,
    deadline: '31 ທັນວາ 2026'
  },
  {
    id: 's2',
    name: 'ທຶນລັດຖະບານເກົາຫຼີ (KGSP)',
    country: 'ເກົາຫຼີໃຕ້',
    level: 'ປະລິນຍາຕີ',
    funded: 'ທຶນເຕັມ',
    match: 76,
    deadline: '15 ພະຈິກ 2026'
  },
  {
    id: 's3',
    name: 'Japan MEXT Scholarship',
    country: 'ຍີ່ປຸ່ນ',
    level: 'ປະລິນຍາໂທ',
    funded: 'ທຶນເຕັມ',
    match: 65,
    deadline: '20 ມັງກອນ 2027'
  }
];

export class ScholarshipsService {
  async getAll(): Promise<Scholarship[]> {
    return scholarshipsData;
  }

  async getById(id: string): Promise<Scholarship | null> {
    return scholarshipsData.find((s) => s.id === id) || null;
  }
}

export const scholarshipsService = new ScholarshipsService();
