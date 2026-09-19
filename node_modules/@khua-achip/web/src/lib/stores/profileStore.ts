import { writable } from 'svelte/store';
import { navStore } from './navStore';

export interface UserNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'scholarship' | 'tutor' | 'riasec' | 'system';
}

export interface UserSettings {
  language: 'lo' | 'en';
  theme: 'light' | 'dark';
  enableNotifications: boolean;
  soundAlerts: boolean;
}

export interface UserProfile {
  fullName: string;
  school: string;
  grade: string;
  avatar: string;
  interests: string[];
  isLoggedIn: boolean;
}

const initialProfile: UserProfile = {
  fullName: 'ອານຸສິນ ເລີດສັກດາ',
  school: 'ໂຮງຮຽນ ມ.ສ ສາທິດ, ວຽງຈັນ',
  grade: 'ມ.6',
  avatar: 'ອລ',
  interests: ['Investigative', 'ຮັກໂປຣແກຣມມິ່ງ', 'ຮັກອອກແບບ'],
  isLoggedIn: true
};

const initialNotifications: UserNotification[] = [
  {
    id: 'n1',
    title: 'ໃກ້ໝົດເຂດຮັບສະໝັກທຶນ!',
    description: 'ທຶນ ASEAN Digital Scholarship ຈະໝົດເຂດສະໝັກໃນ 31 ທັນວາ 2026',
    time: '2 ຊົ່ວໂມງກ່ອນ',
    read: false,
    type: 'scholarship'
  },
  {
    id: 'n2',
    title: 'ອາຈານ ວັນນະລີ ເປີດຄອສໃໝ່',
    description: 'ຫຼັກສູດ Python ພື້ນຖານສຳລັບຜູ້ເລີ່ມຕົ້ນ ເລີ່ມຮຽນວັນຈັນໜ້າ',
    time: 'ມື້ວານນີ້',
    read: false,
    type: 'tutor'
  },
  {
    id: 'n3',
    title: 'ຜົນການປະເມີນ RIASEC ພ້ອມແລ້ວ',
    description: 'ກວດເບິ່ງ 4 ອາຊີບແນະນຳທີ່ກົງກັບບຸກຄະລິກຂອງທ່ານ',
    time: '2 ມື້ກ່ອນ',
    read: true,
    type: 'riasec'
  }
];

const initialSettings: UserSettings = {
  language: 'lo',
  theme: 'light',
  enableNotifications: true,
  soundAlerts: true
};

function createProfileStore() {
  const profile = writable<UserProfile>(initialProfile);
  const notifications = writable<UserNotification[]>(initialNotifications);
  const settings = writable<UserSettings>(initialSettings);
  
  const activeModal = writable<'notifications' | 'settings' | 'editProfile' | null>(null);

  return {
    profile,
    notifications,
    settings,
    activeModal,

    openModal: (modal: 'notifications' | 'settings' | 'editProfile') => activeModal.set(modal),
    closeModal: () => activeModal.set(null),

    updateProfile: (updated: Partial<UserProfile>) => {
      profile.update((p) => {
        const next = { ...p, ...updated };
        if (updated.fullName) {
          const words = updated.fullName.trim().split(/\s+/);
          next.avatar = words.length > 1
            ? (words[0].charAt(0) + words[1].charAt(0))
            : updated.fullName.slice(0, 2);
        }
        return next;
      });
    },

    updateSettings: (updated: Partial<UserSettings>) => {
      settings.update((s) => ({ ...s, ...updated }));
    },

    markNotificationAsRead: (id: string) => {
      notifications.update((list) =>
        list.map((item) => (item.id === id ? { ...item, read: true } : item))
      );
    },

    markAllNotificationsRead: () => {
      notifications.update((list) => list.map((item) => ({ ...item, read: true })));
    },

    logout: () => {
      profile.update((p) => ({ ...p, isLoggedIn: false }));
      activeModal.set(null);
      navStore.go('landing');
    },

    login: () => {
      profile.update((p) => ({ ...p, isLoggedIn: true }));
      navStore.go('home');
    }
  };
}

export const profileStore = createProfileStore();
