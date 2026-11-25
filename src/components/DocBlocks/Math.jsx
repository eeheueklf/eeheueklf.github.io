import React from 'react';

export default function Math({children, sub}) {
  return (
    <div className="doc-math">
      {children}
      {sub && <span className="doc-math__sub">{sub}</span>}
    </div>
  );
}
