import { writable } from 'svelte/store';

export interface SavedState {
  careers: string[]; // ids
  unis: { name: string; sub: string }[];
  tutors: string[]; // ids
  centers: string[]; // ids
  scholarships: string[]; // ids
}

const initialSaved: SavedState = {
  careers: ['sw'],
  unis: [{ name: 'ຄະນະວິທະຍາສາດຄອມພິວເຕີ, ມຊ.ລ', sub: 'National University of Laos' }],
  tutors: ['t1'],
  centers: ['c1'],
  scholarships: ['s1']
};

function createSavedStore() {
  const { subscribe, update } = writable<SavedState>(initialSaved);

  return {
    subscribe,
    toggleCareer: (id: string) => {
      update((s) => {
        const exists = s.careers.includes(id);
        return {
          ...s,
          careers: exists ? s.careers.filter((x) => x !== id) : [...s.careers, id]
        };
      });
    },
    toggleTutor: (id: string) => {
      update((s) => {
        const exists = s.tutors.includes(id);
        return {
          ...s,
          tutors: exists ? s.tutors.filter((x) => x !== id) : [...s.tutors, id]
        };
      });
    },
    toggleCenter: (id: string) => {
      update((s) => {
        const exists = s.centers.includes(id);
        return {
          ...s,
          centers: exists ? s.centers.filter((x) => x !== id) : [...s.centers, id]
        };
      });
    },
    toggleSchol: (id: string) => {
      update((s) => {
        const exists = s.scholarships.includes(id);
        return {
          ...s,
          scholarships: exists ? s.scholarships.filter((x) => x !== id) : [...s.scholarships, id]
        };
      });
    }
  };
}

export const savedStore = createSavedStore();
