'use client'

import React from 'react';

interface StatusBarProps {
  wordCount: number;
  charCount: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ wordCount, charCount }) => {
  return (
    <div className="toolbar flex items-center overflow-x-auto overflow-y-hidden scroll-snap-x mandatory scrollbar-none">
      <div className="toolbar__info text-color-text font-inherit text-base border-0 rounded-var(--spacing) mx-auto mb-var(--spacing) scroll-snap-align-start">
        {wordCount}w {charCount}ch
      </div>
    </div>
  );
};

export default StatusBar;
