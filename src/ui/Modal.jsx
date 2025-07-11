import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles/modal.module.css';

const Modal = ({
    isOpen,
    onClose,
    children,
    size = 'md',
    closeOnOverlay = true,
    className = '',
    ...props
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalClasses = [
        styles.modal,
        styles[size],
        className
    ].filter(Boolean).join(' ');

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlay) {
            onClose();
        }
    };

    return createPortal(
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={modalClasses} {...props}>
                {children}
            </div>
        </div>,
        document.body
    );
};

// Sub-components
const ModalHeader = ({ children, className = '', ...props }) => (
    <div className={`${styles.header} ${className}`} {...props}>
        {children}
    </div>
);

const ModalTitle = ({ children, className = '', ...props }) => (
    <h2 className={`${styles.title} ${className}`} {...props}>
        {children}
    </h2>
);

const ModalCloseButton = ({ onClick, className = '', ...props }) => (
    <button
        className={`${styles.closeButton} ${className}`}
        onClick={onClick}
        aria-label="Close modal"
        {...props}
    >
        ✕
    </button>
);

const ModalBody = ({ children, className = '', ...props }) => (
    <div className={`${styles.body} ${className}`} {...props}>
        {children}
    </div>
);

const ModalFooter = ({ children, className = '', ...props }) => (
    <div className={`${styles.footer} ${className}`} {...props}>
        {children}
    </div>
);

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.CloseButton = ModalCloseButton;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
