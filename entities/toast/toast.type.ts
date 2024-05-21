type ToastItem = {
  id: string;
  message: string;
  status?: 'success' | 'error';
  showDuration?: number;
};

type ToastItemProps = {
  message: string;
  status?: 'success' | 'error';
  showDuration?: number;
};

type ToastState = {
  toastList: ToastItem[];
};

type ToastAction = {
  createToast: (toast: ToastItemProps) => void;
  removeToast: (toastId: string) => void;
};

type ToastStore = ToastState & ToastAction;

export type { ToastItemProps, ToastStore, ToastState, ToastAction, ToastItem };
