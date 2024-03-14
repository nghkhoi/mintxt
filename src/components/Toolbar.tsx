'use client'

import React from 'react';

interface ToolbarProps {
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onQuote: () => void;
  onEnDash: () => void;
  onEmDash: () => void;
  onJapaneseLongVowel: () => void;
  onUpperCase: () => void;
  onLowerCase: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onWrap: () => void;
  onStatusBar: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onClear,
  onUndo,
  onRedo,
  onQuote,
  onEnDash,
  onEmDash,
  onJapaneseLongVowel,
  onUpperCase,
  onLowerCase,
  onCopy,
  onPaste,
  onWrap,
  onStatusBar,
}) => {
  return (
    <div className="toolbar flex items-center overflow-x-auto overflow-y-hidden scroll-snap-x mandatory scrollbar-none">
      <button className="toolbar__button" onClick={onClear} title="Clear">◌</button>
      <button className="toolbar__button" onClick={onUndo} title="Undo">↻</button>
      <button className="toolbar__button" onClick={onRedo} title="Redo">↺</button>
      <button className="toolbar__button" onClick={onQuote} title="Quote">“”</button>
      <button className="toolbar__button" onClick={onEnDash} title="En Dash">–</button>
      <button className="toolbar__button" onClick={onEmDash} title="Em Dash">—</button>
      <button className="toolbar__button" onClick={onJapaneseLongVowel} title="Chōon">ō</button>
      <button className="toolbar__button" onClick={onUpperCase} title="UPPER CASE">AB</button>
      <button className="toolbar__button" onClick={onLowerCase} title="lower case">ab</button>
      <button className="toolbar__button" onClick={onCopy} title="Copy">⧉</button>
      <button className="toolbar__button" onClick={onPaste} title="Paste">📋</button>
      <button className="toolbar__button" onClick={onWrap} title="Toggle Wrap">⥻</button>
      <button className="toolbar__button" onClick={onStatusBar} title="Toggle Status bar">‗</button>
    </div>
  );
};

export default Toolbar;
