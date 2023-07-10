import React, {
  ReactEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import styles from './Modal.module.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // work out which classes should be applied to the dialog element
  const dialogClasses = useMemo(() => {
    const _arr = [styles['modal']];
    if (!open) _arr.push(styles['modal--closing']);

    return _arr.join(' ');
  }, [open]);

  // Eventlistener: trigger onclose when cancel detected
  const onCancel: ReactEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  // Eventlistener: trigger onclose when click outside
  const onClick: ReactEventHandler = useCallback(
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el) onClose();
    },
    [onClose]
  );

  // Eventlistener: trigger close click on anim end
  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open && el) el.close();
  }, [open]);

  // when open changes run open/close command
  useEffect(() => {
    const { current: el } = modalRef;
    if (open && el) {
      el.showModal();
    }
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
    >
      <div className={styles['modal__container']}>{children}</div>
    </dialog>
  );
}
