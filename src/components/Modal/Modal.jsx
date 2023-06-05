import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modal');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const htmlEl = document.querySelector('html');

    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    htmlEl.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      htmlEl.style.overflow = 'visible';
    };
  }, [onClose]);

  const onBackdropClick = e => {
    console.log('currentTarget:', e.currentTarget);
    console.log('target:', e.target);
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={onBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    rootModal
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
