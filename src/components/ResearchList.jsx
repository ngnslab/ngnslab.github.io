import React from 'react';

export default function ResearchList({ items, renderItem, color = '#4a5568', style = {} }) {
  if (!items || items.length === 0) return <div style={{ color: '#718096', ...style }}>데이터 없음</div>;
  return (
    <ul className="research-list" style={style}>
      {items.map((item, i) => (
        <li key={i} className="research-item">
          <span className="research-content">{renderItem(item)}</span>
        </li>
      ))}
    </ul>
  );
}