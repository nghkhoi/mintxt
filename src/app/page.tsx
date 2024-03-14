'use client'

import React, { useState, useRef } from 'react';
import Toolbar from '../components/Toolbar';
import Editor from '../components/Editor';
import StatusBar from '../components/StatusBar';

const Page: React.FC = () => {
  const editorRef = useRef(null);
  const [text, setText] = useState('');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const updateCounts = (text: string) => {
    setWordCount(text.match(/\S+/g)?.length || 0); // Alternative: /\w+/g
    setCharCount(text.length);
  };

  // Dynamically update word count on text input
  const handleTextChange = (newText: string) => {
    setText(newText);
    updateCounts(newText);
  };

  const handleSelect = (start: number, end: number) => {
    setSelectionStart(start);
    setSelectionEnd(end);
  };

  const handleClear = () => {
    if (text.trim().length > 0 && window.confirm("Do you really want to clear all content?")) {
      setText('');
      setWordCount(0);
      setCharCount(0);
    }
  };

  const handleUndo = () => {
    document.execCommand('undo');
    updateCounts(text);
  };

  const handleRedo = () => {
    document.execCommand('redo');
    updateCounts(text);
  };

  const handleQuote = () => {
    insertText('“', '”');
  };

  const handleEnDash = () => {
    insertText('–');
  };

  const handleEmDash = () => {
    insertText('—');
  };

  const handleJapaneseLongVowel = () => {
    const vowelMap: Record<string, string> = {
      'a': 'ā',
      'i': 'ī',
      'u': 'ū',
      'e': 'ē',
      'o': 'ō',
      'A': 'Ā',
      'I': 'Ī',
      'U': 'Ū',
      'E': 'Ē',
      'O': 'Ō'
    };
  
    let updatedText = text;
    let start = selectionStart;
    let end = selectionEnd;
  
    if (start === end && start > 0) {
      start--;
    }
  
    const selectedText = text.substring(start, end);
  
    if (selectedText.length === 1) {
      const selectedChar = selectedText.charAt(0);
      updatedText = text.slice(0, start) + vowelMap[selectedChar] + text.slice(end);
    } else {
      updatedText = text.slice(0, start) + 'ō' + text.slice(end);
    }
  
    setText(updatedText);
    setSelectionStart(end);
    setSelectionEnd(end);
  };

  const handleUpperCase = () => {
    const newText = text.slice(0, selectionStart) + text.slice(selectionStart, selectionEnd).toUpperCase() + text.slice(selectionEnd);
    setText(newText);
  };

  const handleLowerCase = () => {
    const newText = text.slice(0, selectionStart) + text.slice(selectionStart, selectionEnd).toLowerCase() + text.slice(selectionEnd);
    setText(newText);
  };

  const handleCopy = () => {
    if (text.trim().length > 0) {
      navigator.clipboard.writeText(text);
    }
  };

  const handlePaste = () => {
    navigator.clipboard.readText()
      .then((clip) => {
        const newText = text.slice(0, selectionStart) + clip + text.slice(selectionEnd);
        setText(newText);
        setSelectionStart(selectionStart + clip.length);
        setSelectionEnd(selectionStart + clip.length);
        updateCounts(newText);
      });
  };

  const insertText = (openText: string, closeText?: string) => {
    const selectedText = text.substring(selectionStart, selectionEnd);
    const newText = closeText ? `${openText}${selectedText}${closeText}` : openText;
    const updatedText = text.slice(0, selectionStart) + newText + text.slice(selectionEnd);
    setText(updatedText);
    setSelectionStart(selectionStart + openText.length);
    setSelectionEnd(selectionStart + openText.length);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <Toolbar
        onClear={handleClear}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onQuote={handleQuote}
        onEnDash={handleEnDash}
        onEmDash={handleEmDash}
        onJapaneseLongVowel={handleJapaneseLongVowel}
        onUpperCase={handleUpperCase}
        onLowerCase={handleLowerCase}
        onCopy={handleCopy}
        onPaste={handlePaste}
        onWrap={function (): void {
          throw new Error('Function not implemented.');
        } }
        onStatusBar={function (): void {
          throw new Error('Function not implemented.');
        } }
      />
      <Editor text={text} setText={setText} onTextChange={handleTextChange}
            onSelect={handleSelect} ref={editorRef}
            selectionStart={selectionStart} setSelectionStart={setSelectionStart}
            selectionEnd={selectionEnd} setSelectionEnd={setSelectionEnd}/>
      <StatusBar wordCount={wordCount} charCount={charCount} />
    </div>
  );
};

export default Page;
