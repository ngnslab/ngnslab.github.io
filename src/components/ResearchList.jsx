import React from 'react';

export default function ResearchList({ items, renderItem, color = '#4a5568', style = {} }) {
  if (!items || items.length === 0) return <div style={{ color: '#718096', ...style }}>데이터 없음</div>;
  return (
    <ul style={{ color, paddingLeft: '1.5rem', ...style }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: '1em', lineHeight: 1.6 }}>
          <span style={{ fontWeight: 'bold', color }}>{`[${i + 1}]`}</span> {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}