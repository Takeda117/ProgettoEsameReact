import { forwardRef } from 'react';
import styles from './styles/input.module.css';

const Input = forwardRef(({
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    label,
    required = false,
    disabled = false,
    icon,
    fullWidth = false,
    size = 'md',
    className = '',
    ...props
}, ref) => {
    const inputClasses = [
        styles.input,
        styles[size],
        error && styles.error,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        icon && styles.hasIcon,
        className
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
        styles.wrapper,
        fullWidth && styles.fullWidth
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClasses}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <div className={styles.inputWrapper}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                    {...props}
                />
            </div>

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;