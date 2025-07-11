import styles from './styles/pagination.module.css';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showInfo = true,
    size = 'md',
    maxVisible = 5,
    className = '',
    ...props
}) => {
    const paginationClasses = [
        styles.pagination,
        styles[size],
        className
    ].filter(Boolean).join(' ');

    // Calculate visible page numbers
    const getVisiblePages = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisible / 2);

        let start = Math.max(1, currentPage - halfVisible);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    const handlePageClick = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const PageButton = ({ page, isActive = false, disabled = false, children }) => (
        <button
            className={`${styles.pageButton} ${isActive ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
            onClick={() => handlePageClick(page)}
            disabled={disabled}
        >
            {children || page}
        </button>
    );

    if (totalPages <= 1) return null;

    return (
        <div className={paginationClasses} {...props}>
            {/* Previous button */}
            <PageButton
                page={currentPage - 1}
                disabled={currentPage === 1}
            >
                ‹
            </PageButton>

            {/* First page */}
            {visiblePages[0] > 1 && (
                <>
                    <PageButton page={1} />
                    {visiblePages[0] > 2 && <span className={styles.ellipsis}>…</span>}
                </>
            )}

            {/* Visible pages */}
            {visiblePages.map(page => (
                <PageButton
                    key={page}
                    page={page}
                    isActive={page === currentPage}
                />
            ))}

            {/* Last page */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <span className={styles.ellipsis}>…</span>
                    )}
                    <PageButton page={totalPages} />
                </>
            )}

            {/* Next button */}
            <PageButton
                page={currentPage + 1}
                disabled={currentPage === totalPages}
            >
                ›
            </PageButton>

            {/* Page info */}
            {showInfo && (
                <div className={styles.info}>
                    Pagina {currentPage} di {totalPages}
                </div>
            )}
        </div>
    );
};

export default Pagination;
