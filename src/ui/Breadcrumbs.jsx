import styles from './styles/breadcrumbs.module.css';

const Breadcrumbs = ({
    items = [],
    separator = '/',
    className = '',
    ...props
}) => {
    const breadcrumbsClasses = [
        styles.breadcrumbs,
        className
    ].filter(Boolean).join(' ');

    if (items.length === 0) return null;

    return (
        <nav className={breadcrumbsClasses} {...props}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className={styles.breadcrumb}>
                        {isLast ? (
                            <span className={styles.breadcrumbCurrent}>
                                {item.label}
                            </span>
                        ) : (
                            <>
                                {item.href ? (
                                    <a href={item.href} className={styles.breadcrumbLink}>
                                        {item.label}
                                    </a>
                                ) : (
                                    <button
                                        onClick={item.onClick}
                                        className={styles.breadcrumbLink}
                                    >
                                        {item.label}
                                    </button>
                                )}
                                <span className={styles.separator}>{separator}</span>
                            </>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;