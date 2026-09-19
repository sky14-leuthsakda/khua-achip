import type { RiasecQuestionItem, DimensionScore, RiasecEvaluationResult } from './types';
import { careersData } from '../careers/service';

export const riasecQuestionsText: string[] = [
  'ຂ້ອຍມັກແກ້ໄຂບັນຫາທີ່ສັບສົນ ແລະ ທ້າທາຍ',
  'ຂ້ອຍມັກເຮັດວຽກກັບເຄື່ອງມື ຫຼື ອຸປະກອນຕ່າງໆ',
  'ຂ້ອຍມັກຄົ້ນຄວ້າ ແລະ ວິເຄາະຂໍ້ມູນ',
  'ຂ້ອຍມັກສ້າງສັນສິ່ງໃໝ່ ຫຼື ອອກແບບ',
  'ຂ້ອຍມັກຊ່ວຍເຫຼືອ ແລະ ໃຫ້ຄຳແນະນຳຄົນອື່ນ',
  'ຂ້ອຍມັກເປັນຜູ້ນຳ ແລະ ຈັດການໂຄງການ',
  'ຂ້ອຍມັກລະບຽບ ແລະ ຈັດຂໍ້ມູນໃຫ້ເປັນໝວດໝູ່',
  'ຂ້ອຍມັກທົດລອງ ແລະ ຫາຄຳຕອບດ້ວຍວິທະຍາສາດ',
  'ຂ້ອຍມັກເຮັດວຽກກາງແຈ້ງ ຫຼືວຽກທີ່ໃຊ້ຮ່າງກາຍ',
  'ຂ້ອຍມັກຂຽນ ຫຼື ນຳສະເໜີແນວຄວາມຄິດ',
  'ຂ້ອຍມັກເວົ້າຕໍ່ໜ້າຄົນຫຼາຍໆ',
  'ຂ້ອຍມັກຄິດໄລ່ ແລະ ວິເຄາະຕົວເລກ',
  'ຂ້ອຍມັກເຮັດວຽກທີ່ມີຂັ້ນຕອນຊັດເຈນ',
  'ຂ້ອຍມັກຄົ້ນຫາຄຳຕອບຂອງຄຳຖາມທີ່ຍາກ',
  'ຂ້ອຍມັກສ້າງດົນຕີ, ສິນລະປະ ຫຼືວັນນະຄະດີ',
  'ຂ້ອຍມັກສອນ ຫຼືຝຶກອົບຮົມຄົນອື່ນ',
  'ຂ້ອຍມັກເຈລະຈາ ແລະ ຊັກຊວນຄົນອື່ນ',
  'ຂ້ອຍມັກເຮັດວຽກທີ່ໃຊ້ຄອມພິວເຕີ',
  'ຂ້ອຍມັກວາງແຜນ ແລະ ຈັດຕາຕະລາງວຽກ',
  'ຂ້ອຍມັກລົງມືເຮັດຫຼາຍກວ່ານັ່ງອ່ານທິດສະດີ',
];

const DIMENSION_DEFS: Record<string, { key: string; color: string; description: string }> = {
  Investigative: {
    key: 'I',
    color: '#0FADA6',
    description: 'ນັກຄົ້ນຄວ້າ — ມັກວິເຄາະ ແລະ ແກ້ໄຂບັນຫາ'
  },
  Realistic: {
    key: 'R',
    color: '#5B7BD8',
    description: 'ນັກປະຕິບັດ — ມັກລົງມືເຮັດຕົວຈິງ'
  },
  Artistic: {
    key: 'A',
    color: '#E8664F',
    description: 'ນັກສ້າງສັນ — ມັກສິລະປະ ແລະ ຄວາມຄິດສ້າງສັນ'
  },
  Conventional: {
    key: 'C',
    color: '#E8A33D',
    description: 'ນັກລະບຽບ — ມັກຄວາມເປັນລະບົບ ແລະ ຈັດການຂໍ້ມູນ'
  },
  Social: {
    key: 'S',
    color: '#8B6DD8',
    description: 'ນັກຊ່ວຍເຫຼືອ — ມັກຕິດຕໍ່ພົວພັນ ແລະ ຊ່ວຍເຫຼືອຄົນອື່ນ'
  },
  Enterprising: {
    key: 'E',
    color: '#9297A6',
    description: 'ນັກບໍລິຫານ — ມັກເປັນຜູ້ນຳ ແລະ ດຳເນີນທຸລະກິດ'
  }
};

const DIMS_ROTATION = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];

export class RiasecService {
  getQuestions(): RiasecQuestionItem[] {
    return riasecQuestionsText.map((text, idx) => {
      const dimName = DIMS_ROTATION[idx % DIMS_ROTATION.length];
      return {
        id: idx + 1,
        text,
        dimension: dimName,
        dimensionKey: DIMENSION_DEFS[dimName].key
      };
    });
  }

  evaluateAnswers(answers: number[]): RiasecEvaluationResult {
    // If no answers or wrong length, return default baseline from prototype
    if (!answers || answers.length === 0) {
      const defaultDims: DimensionScore[] = [
        { key: 'I', name: 'Investigative', score: 82, color: '#0FADA6', description: DIMENSION_DEFS.Investigative.description },
        { key: 'R', name: 'Realistic', score: 74, color: '#5B7BD8', description: DIMENSION_DEFS.Realistic.description },
        { key: 'A', name: 'Artistic', score: 61, color: '#E8664F', description: DIMENSION_DEFS.Artistic.description },
        { key: 'C', name: 'Conventional', score: 55, color: '#E8A33D', description: DIMENSION_DEFS.Conventional.description },
        { key: 'S', name: 'Social', score: 45, color: '#8B6DD8', description: DIMENSION_DEFS.Social.description },
        { key: 'E', name: 'Enterprising', score: 38, color: '#9297A6', description: DIMENSION_DEFS.Enterprising.description },
      ];
      return {
        primaryDimension: defaultDims[0],
        dimensions: defaultDims,
        matchedCareers: careersData
      };
    }

    const sums: Record<string, { total: number; count: number }> = {};
    for (const d of DIMS_ROTATION) {
      sums[d] = { total: 0, count: 0 };
    }

    answers.forEach((val, idx) => {
      const dimName = DIMS_ROTATION[idx % DIMS_ROTATION.length];
      const numericVal = Math.min(5, Math.max(1, Number(val) || 3));
      sums[dimName].total += numericVal;
      sums[dimName].count += 1;
    });

    const dimensions: DimensionScore[] = DIMS_ROTATION.map((name) => {
      const def = DIMENSION_DEFS[name];
      const stat = sums[name];
      const pct = stat.count > 0 ? Math.round((stat.total / (stat.count * 5)) * 100) : 50;
      return {
        key: def.key,
        name,
        score: pct,
        color: def.color,
        description: def.description
      };
    }).sort((a, b) => b.score - a.score);

    const primaryDimension = dimensions[0];

    return {
      primaryDimension,
      dimensions,
      matchedCareers: careersData
    };
  }
}

export const riasecService = new RiasecService();
