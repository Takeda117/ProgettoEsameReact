import styles from './styles/button.module.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    onClick,
    type = 'button',
    icon,
    className = '',
    ...props
}) => {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
