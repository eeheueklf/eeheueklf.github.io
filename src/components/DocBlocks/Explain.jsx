import React from 'react';

export default function Explain({symbols, meaning, example, children}) {
  return (
    <div className="doc-explain">
      {symbols && symbols.length > 0 && (
        <>
          <h4>기호 읽기</h4>
          <dl>
            {symbols.map((row, i) => (
              <React.Fragment key={i}>
                <dt dangerouslySetInnerHTML={{__html: row.sym}} />
                <dd dangerouslySetInnerHTML={{__html: row.desc}} />
              </React.Fragment>
            ))}
          </dl>
        </>
      )}
      {meaning && (
        <>
          <h4>식의 의미</h4>
          <div>{meaning}</div>
        </>
      )}
      {children}
      {example && <p className="doc-explain__ex">{example}</p>}
    </div>
  );
}
