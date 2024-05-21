import { createStore } from 'zustand/vanilla';
import type { ToastItem, ToastState, ToastStore } from '../toast.type';
import { MAX_TOAST_COUNT } from '../toast.constant';
import { v4 as uuidv4 } from 'uuid';

const defaultState: ToastState = {
  toastList: [],
};

const crateToastStore = (initState: ToastState = defaultState) => {
  return createStore<ToastStore>()(set => ({
    ...initState,
    createToast: toast =>
      set(state => {
        const id = uuidv4();
        const newToast: ToastItem = { id, ...toast };

        if (MAX_TOAST_COUNT <= state.toastList.length) {
          return { toastList: [...state.toastList.slice(1), newToast] };
        }
        return { toastList: [...state.toastList, newToast] };
      }),
    removeToast: id =>
      set(state => ({
        toastList: state.toastList.filter(toast => toast.id !== id),
      })),
  }));
};

export { crateToastStore };
export type { ToastState };
