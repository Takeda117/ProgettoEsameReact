import styles from './styles/card.module.css';

const Card = ({
    children,
    padding = 'md',
    shadow = 'sm',
    border = true,
    hoverable = false,
    clickable = false,
    onClick,
    className = '',
    ...props
}) => {
    const cardClasses = [
        styles.card,
        styles[`padding-${padding}`],
        styles[`shadow-${shadow}`],
        border && styles.border,
        hoverable && styles.hoverable,
        clickable && styles.clickable,
        className
    ].filter(Boolean).join(' ');

    const CardComponent = clickable ? 'button' : 'div';

    return (
        <CardComponent
            className={cardClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </CardComponent>
    );
};

// Sub-components - STANDARDIZZATI con pattern array
const CardHeader = ({ children, className = '', ...props }) => {
    const headerClasses = [styles.header, className].filter(Boolean).join(' ');

    return (
        <div className={headerClasses} {...props}>
            {children}
        </div>
    );
};

const CardBody = ({ children, className = '', ...props }) => {
    const bodyClasses = [styles.body, className].filter(Boolean).join(' ');

    return (
        <div className={bodyClasses} {...props}>
            {children}
        </div>
    );
};

const CardFooter = ({ children, className = '', ...props }) => {
    const footerClasses = [styles.footer, className].filter(Boolean).join(' ');

    return (
        <div className={footerClasses} {...props}>
            {children}
        </div>
    );
};

const CardTitle = ({ children, className = '', as = 'h3', ...props }) => {
    const Component = as;
    const titleClasses = [styles.title, className].filter(Boolean).join(' ');

    return (
        <Component className={titleClasses} {...props}>
            {children}
        </Component>
    );
};

const CardText = ({ children, className = '', ...props }) => {
    const textClasses = [styles.text, className].filter(Boolean).join(' ');

    return (
        <p className={textClasses} {...props}>
            {children}
        </p>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Text = CardText;

export default Card;