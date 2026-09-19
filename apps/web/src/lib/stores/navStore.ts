import { writable, derived } from 'svelte/store';

export type ScreenName =
  | 'landing'
  | 'home'
  | 'explore'
  | 'mentor'
  | 'saved'
  | 'profile'
  | 'careerList'
  | 'careerDetail'
  | 'uniDetail'
  | 'tutorList'
  | 'tutorDetail'
  | 'centerList'
  | 'centerDetail'
  | 'scholList'
  | 'scholDetail'
  | 'riasecWelcome'
  | 'riasecQ'
  | 'riasecResult'
  | 'roadmap';

export const TAB_SCREENS: ScreenName[] = ['home', 'explore', 'mentor', 'saved', 'profile'];

interface NavState {
  currentScreen: ScreenName;
  stack: ScreenName[];
  params: Record<string, any>;
}

const initialState: NavState = {
  currentScreen: 'landing',
  stack: ['landing'],
  params: {
    careerId: 'sw',
    tutorId: 't1',
    centerId: 'c1',
    scholId: 's1'
  }
};

function createNavStore() {
  const { subscribe, set, update } = writable<NavState>(initialState);

  return {
    subscribe,
    go: (screen: ScreenName, newParams?: Record<string, any>) => {
      update((state) => {
        const isTab = TAB_SCREENS.includes(screen);
        const stack = isTab ? [screen] : [...state.stack, screen];
        const params = newParams ? { ...state.params, ...newParams } : state.params;
        return {
          currentScreen: screen,
          stack,
          params
        };
      });
    },
    back: () => {
      update((state) => {
        if (state.stack.length > 1) {
          const nextStack = [...state.stack];
          nextStack.pop();
          const prevScreen = nextStack[nextStack.length - 1];
          return {
            ...state,
            currentScreen: prevScreen,
            stack: nextStack
          };
        }
        return {
          ...state,
          currentScreen: 'home',
          stack: ['home']
        };
      });
    },
    setParams: (params: Record<string, any>) => {
      update((state) => ({
        ...state,
        params: { ...state.params, ...params }
      }));
    },
    reset: () => set(initialState)
  };
}

export const navStore = createNavStore();

export const isBottomNavVisible = derived(navStore, ($nav) => {
  return TAB_SCREENS.includes($nav.currentScreen) && $nav.currentScreen !== 'mentor';
});
