import { createStore } from 'zustand/vanilla';
import { User } from '../auth.type';
import {
  deleteLocalStorageToken,
  getLocalStorageToken,
  setLocalStorageToken,
} from '../lib/auth.lib';
import { getUserInfor } from '../auth.api';

const defaultState: AuthState = {
  isLoggedIn: false,
  userInfo: undefined,
};

const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthState & AuthAction>()(set => ({
    ...initState,
    login: userInfo =>
      set(() => {
        const { token } = userInfo;
        setLocalStorageToken(token);
        return { isLoggedIn: true, userInfo: userInfo };
      }),
    update: userInfo =>
      set(() => {
        const { token } = userInfo;
        setLocalStorageToken(token);
        return { userInfo: userInfo };
      }),
    logout: () =>
      set(() => {
        deleteLocalStorageToken();
        return { isLoggedIn: false, userInfo: undefined };
      }),
    load: async () => {
      const token = getLocalStorageToken();

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
  login: (userInfo: User) => void;
  update: (userInfo: User) => void;
  logout: () => void;
  load: () => Promise<void>;
};

type AuthStore = AuthState & AuthAction;

export type { AuthStore };
