import type { Center } from './types';

export const centersData: Center[] = [
  {
    id: 'c1',
    init: 'CS',
    name: 'CodeLab Vientiane',
    subj: 'ໂປຣແກຣມມິ່ງ',
    rating: 4.7,
    loc: 'ວຽງຈັນ',
    mode: 'ອອນລາຍ+ອອຟລາຍ',
    price: '350,000 LAK/ເດືອນ',
    grad: 'linear-gradient(135deg,#5865C2,#0FADA6)'
  },
  {
    id: 'c2',
    init: 'EN',
    name: 'Bright English Center',
    subj: 'ພາສາອັງກິດ',
    rating: 4.8,
    loc: 'ວຽງຈັນ',
    mode: 'ອອນລາຍ',
    price: '300,000 LAK/ເດືອນ',
    grad: 'linear-gradient(135deg,#E8664F,#E8A33D)'
  },
  {
    id: 'c3',
    init: 'MA',
    name: 'ສູນຄະນິດສາດ ອານຸໄກ',
    subj: 'ຄະນິດສາດ',
    rating: 4.6,
    loc: 'ວຽງຈັນ',
    mode: 'ອອຟລາຍ',
    price: '250,000 LAK/ເດືອນ',
    grad: 'linear-gradient(135deg,#16224A,#0FADA6)'
  }
];

export class CentersService {
  async getAll(): Promise<Center[]> {
    return centersData;
  }

  async getById(id: string): Promise<Center | null> {
    return centersData.find((c) => c.id === id) || null;
  }
}

export const centersService = new CentersService();
