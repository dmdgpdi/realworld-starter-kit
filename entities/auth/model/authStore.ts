import { createStore } from 'zustand/vanilla';
import { User } from '../auth.type';
import { getUserInfor } from '../auth.api';

const defaultState: AuthState = {
  isLoggedIn: false,
  userInfo: undefined,
};

const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthState & AuthAction>()(set => ({
    ...initState,
    login: async (token: string | undefined) => {
      if (!token) {
        return;
      }

      const { user } = await getUserInfor(token);
      return set(() => ({ isLoggedIn: true, userInfo: user }));
    },
    update: userInfo =>
      set(() => {
        return { userInfo: userInfo };
      }),
    logout: async () => {
      return set(() => {
        return { isLoggedIn: false, userInfo: undefined };
      });
    },
    load: async (token: string | undefined) => {
      if (!token) {
        return;
      }

      const { user } = await getUserInfor(token);
      return set(() => ({ isLoggedIn: true, userInfo: user }));
    },
  }));
};

export { createAuthStore };

type AuthState = {
  isLoggedIn: boolean;
  userInfo: User | undefined;
};

type AuthAction = {
  login: (token: string | undefined) => Promise<void>;
  update: (userInfo: User) => void;
  logout: () => Promise<void>;
  load: (token: string | undefined) => Promise<void>;
};

type AuthStore = AuthState & AuthAction;

export type { AuthStore };
