'use client'

import React, { useState, forwardRef } from 'react';

interface EditorProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onTextChange: (newText: string) => void;
  selectionStart: number;
  setSelectionStart: React.Dispatch<React.SetStateAction<number>>;
  selectionEnd: number;
  setSelectionEnd: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (start: number, end: number) => void;
}

const Editor: React.ForwardRefRenderFunction<HTMLTextAreaElement, EditorProps> = (
  { text, setText, selectionStart, setSelectionStart, selectionEnd, setSelectionEnd, onTextChange, onSelect },
  ref
) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const selStart = event.target.selectionStart;
    const selEnd = event.target.selectionEnd;
    setSelectionStart(selStart);
    setSelectionEnd(event.target.selectionEnd);
    onSelect (selStart, selEnd);
  };
 
  return (
    <textarea
      ref={ref}
      className="textedit flex-grow bg-gray-800 text-white font-sans text-lg rounded-md border border-gray-700 outline-none resize-none p-2 m-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full hover:scrollbar-thumb-gray-600 w"
      value={text}
      onChange={handleChange}
      onSelect={handleSelect}
      autoFocus
    ></textarea>
  );
};

export default forwardRef(Editor);