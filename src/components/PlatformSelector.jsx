import React from 'react';
import { platforms } from '../utils/searchRoutes';

const PlatformSelector = ({ selected, toggle }) => {
    return (
        <div className="platform-grid">
            {platforms.map(p => (
                <div
                    key={p.id}
                    className={`platform-item ${selected.includes(p.id) ? 'active' : ''}`}
                    onClick={() => toggle(p.id)}
                    style={{ '--active-color': p.color }}
                >
                    <span className="icon">{p.icon}</span>
                    <span className="name">{p.name}</span>
                </div>
            ))}
        </div>
    );
};
export default PlatformSelector;
