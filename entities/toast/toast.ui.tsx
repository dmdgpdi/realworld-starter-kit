'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as style from './toast.css';
import { isEmptyList } from '@/shared/lib';
import { useToastStore } from './model/toast.provider';
import {
  TOAST_CLOSE_ANIMATION_DURATION,
  TOAST_SHOW_DURATION,
} from './toast.constant';

function Toast({
  id,
  onClose,
  status = 'error',
  showDuration = TOAST_SHOW_DURATION,
  children,
  ...attributes
}: ToastProps) {
  const [activeHideAnimation, setActiveHideAnimation] = useState(false);

  const toastBoxStyle = activeHideAnimation
    ? `${style.toastBox} ${style.hideToastBox}`
    : style.toastBox;

  const showAnimationRef = useRef<NodeJS.Timeout>();
  const hideAnimationRef = useRef<NodeJS.Timeout>();

  const handleClose = useCallback(() => {
    hideAnimationRef.current = setTimeout(() => {
      onClose();
      clearTimeout(showAnimationRef.current);
    }, TOAST_CLOSE_ANIMATION_DURATION);
  }, [onClose]);

  useEffect(() => {
    showAnimationRef.current = setTimeout(() => {
      setActiveHideAnimation(true);
      handleClose();
    }, showDuration);

    return () => clearTimeout(hideAnimationRef.current);
  }, [handleClose, showDuration]);

  return (
    <div className={toastBoxStyle} {...attributes}>
      <p className={style.toastText}>{`${status}: ${children}`}</p>
    </div>
  );
}

function ToastContainer() {
  const { toastList, removeToast } = useToastStore(state => state);

  if (isEmptyList(toastList)) {
    return undefined;
  }

  return (
    <div id="toast-box" className={style.toastBoxList}>
      {toastList.map(({ id, message, ...attributes }) => (
        <Toast id={id} key={id} onClose={() => removeToast(id)} {...attributes}>
          {message}
        </Toast>
      ))}
    </div>
  );
}

export { Toast, ToastContainer };

type ToastProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'id'> & {
  id: string;
  status?: 'success' | 'error';
  showDuration?: number;
  onClose: () => void;
};
