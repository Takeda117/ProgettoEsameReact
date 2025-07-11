import { forwardRef } from 'react';
import styles from './styles/select.module.css';

const Select = forwardRef(({
    options = [],
    value,
    onChange,
    placeholder = 'Seleziona...',
    error,
    label,
    required = false,
    disabled = false,
    fullWidth = false,
    size = 'md',
    className = '',
    ...props
}, ref) => {
    const selectClasses = [
        styles.select,
        styles[size],
        error && styles.error,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
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

            <div className={styles.selectWrapper}>
                <select
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={selectClasses}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option, index) => {
                        if (typeof option === 'string') {
                            return (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            );
                        }
                        return (
                            <option key={option.value || index} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </select>
                <div className={styles.arrow}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                        <path d="M6 8L0 2L1.4 0.6L6 5.2L10.6 0.6L12 2L6 8Z" />
                    </svg>
                </div>
            </div>

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;