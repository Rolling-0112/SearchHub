import React from 'react';

const SearchBar = ({ value, onChange, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入关键词，探索全网..."
                autoFocus
            />
            <button onClick={onSearch}>搜 索</button>
        </div>
    );
};

export default SearchBar;
