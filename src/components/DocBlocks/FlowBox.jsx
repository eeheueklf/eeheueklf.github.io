import React from 'react';

export default function FlowBox({code, label, children}) {
  return (
    <div className="doc-flow__box">
      {code ? <code>{code}</code> : children}
      {label && <small>{label}</small>}
    </div>
  );
}
