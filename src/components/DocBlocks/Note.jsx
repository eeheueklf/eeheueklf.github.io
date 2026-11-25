import React from 'react';

export default function Note({type = 'info', title, children}) {
  return (
    <div className={`doc-note doc-note--${type}`}>
      {title && <b className="doc-note__title">{title}</b>}
      {children}
    </div>
  );
}
