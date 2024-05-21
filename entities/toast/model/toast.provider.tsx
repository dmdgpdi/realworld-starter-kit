'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';
import { crateToastStore } from './store';
import type { ToastStore } from '../toast.type';

export const ToastStoreContext = createContext<StoreApi<ToastStore> | null>(
  null,
);

export const ToastStoreProvider = ({ children }: ToastStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ToastStore>>();

  if (!storeRef.current) {
    storeRef.current = crateToastStore();
  }

  return (
    <ToastStoreContext.Provider value={storeRef.current}>
      {children}
    </ToastStoreContext.Provider>
  );
};

export const useToastStore = <T,>(selector: (store: ToastStore) => T): T => {
  const toastStoreContext = useContext(ToastStoreContext);

  if (!toastStoreContext) {
    throw new Error('useToastStore must be use within ToastStoreProvider');
  }

  return useStore(toastStoreContext, selector);
};

export type ToastStoreProviderProps = {
  children: ReactNode;
};
