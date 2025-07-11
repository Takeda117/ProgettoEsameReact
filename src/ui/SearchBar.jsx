import { useState, useRef, useEffect } from 'react';
import styles from './styles/searchbar.module.css';

const SearchBar = ({
    value,
    onChange,
    placeholder = 'Cerca...',
    suggestions = [],
    onSuggestionSelect,
    className = '',
    ...props
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    const searchClasses = [
        styles.searchContainer,
        className
    ].filter(Boolean).join(' ');

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 8);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
        setShowSuggestions(newValue.length > 0 && filteredSuggestions.length > 0);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || filteredSuggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredSuggestions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSuggestionClick(filteredSuggestions[highlightedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onChange(suggestion);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        if (onSuggestionSelect) {
            onSuggestionSelect(suggestion);
        }
    };

    const handleClear = () => {
        onChange('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    return (
        <div className={searchClasses}>
            <div className={styles.searchIcon}>
                🔍
            </div>

            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (value.length > 0 && filteredSuggestions.length > 0) {
                        setShowSuggestions(true);
                    }
                }}
                placeholder={placeholder}
                className={styles.searchInput}
                {...props}
            />

            {value && (
                <button
                    className={styles.clearButton}
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    ✕
                </button>
            )}

            {showSuggestions && filteredSuggestions.length > 0 && (
                <div ref={suggestionsRef} className={styles.suggestions}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`${styles.suggestion} ${index === highlightedIndex ? styles.highlighted : ''
                                }`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;