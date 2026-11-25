import React, {Children} from 'react';

export default function Flow({children}) {
  const items = Children.toArray(children);
  return (
    <div className="doc-card">
      <div className="doc-flow">
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {child}
            {i < items.length - 1 && <div className="doc-flow__arrow">→</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
