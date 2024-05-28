'use client';

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import { type StoreApi, useStore } from 'zustand';
import { createAuthStore, AuthStore } from './authStore';

const AuthStoreContext = createContext<StoreApi<AuthStore> | undefined>(
  undefined,
);

function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const storeRef = useRef<StoreApi<AuthStore>>();

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}

function useAuthStore<T>(selector: (store: AuthStore) => T): T {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error('useAuthStore must be use within AuthStoreProvider');
  }

  return useStore(authStoreContext, selector);
}

function AuthLoader({ children }: { children: ReactNode }) {
  const load = useAuthStore(state => state.load);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const loadAuth = async () => {
      await load();
      setIsLoad(true);
    };

    loadAuth();
  }, [load]);

  return isLoad ? children : undefined;
}

export { AuthStoreProvider, useAuthStore, AuthLoader };

type AuthStoreProviderProps = {
  children: ReactNode;
};
