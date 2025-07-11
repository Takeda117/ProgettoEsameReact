import styles from './styles/container.module.css';

const Container = ({
    children,
    maxWidth = 'lg',
    padding = 'md',
    centered = false,
    className = '',
    ...props
}) => {
    const containerClasses = [
        styles.container,
        styles[maxWidth],
        styles[`padding-${padding}`],
        centered && styles.centered,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} {...props}>
            {children}
        </div>
    );
};

export default Container;