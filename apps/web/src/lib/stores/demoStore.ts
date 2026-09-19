import { writable } from 'svelte/store';
import { navStore, type ScreenName } from './navStore';

export interface DemoStep {
  screen: ScreenName;
  name: string;
  params?: Record<string, any>;
}

export const DEMO_STEPS: DemoStep[] = [
  { screen: 'home', name: 'ໜ້າຫຼັກ' },
  { screen: 'riasecResult', name: 'ຜົນການປະເມີນ RIASEC' },
  { screen: 'careerDetail', name: 'ອາຊີບທີ່ແນະນຳ', params: { careerId: 'sw' } },
  { screen: 'uniDetail', name: 'ມະຫາວິທະຍາໄລ' },
  { screen: 'mentor', name: 'AI Mentor' },
  { screen: 'tutorDetail', name: 'ອາຈານແນະນຳ', params: { tutorId: 't1' } },
  { screen: 'centerDetail', name: 'ສູນຮຽນແນະນຳ', params: { centerId: 'c1' } },
  { screen: 'scholDetail', name: 'ທຶນການສຶກສາ', params: { scholId: 's1' } },
  { screen: 'roadmap', name: 'ເສັ້ນທາງການຮຽນ' }
];

interface DemoState {
  isActive: boolean;
  stepIndex: number;
}

function createDemoStore() {
  const { subscribe, set, update } = writable<DemoState>({
    isActive: false,
    stepIndex: 0
  });

  const applyStep = (index: number) => {
    const step = DEMO_STEPS[index];
    if (step) {
      navStore.go(step.screen, step.params);
    }
  };

  return {
    subscribe,
    startDemo: () => {
      set({ isActive: true, stepIndex: 0 });
      applyStep(0);
    },
    next: () => {
      update((state) => {
        if (!state.isActive) return state;
        const nextIdx = Math.min(DEMO_STEPS.length - 1, state.stepIndex + 1);
        applyStep(nextIdx);
        return { ...state, stepIndex: nextIdx };
      });
    },
    prev: () => {
      update((state) => {
        if (!state.isActive) return state;
        const prevIdx = Math.max(0, state.stepIndex - 1);
        applyStep(prevIdx);
        return { ...state, stepIndex: prevIdx };
      });
    },
    exit: () => {
      set({ isActive: false, stepIndex: 0 });
      navStore.go('home');
    }
  };
}

export const demoStore = createDemoStore();
