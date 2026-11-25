import React from 'react';

export default function Pill({type = 'ok', children}) {
  return <span className={`doc-pill doc-pill--${type}`}>{children}</span>;
}
