import React from 'react';

export const GoldMedalIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="14" r="7" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <path d="M12 11.5L13.1 13.7L15.5 14L13.8 15.6L14.2 18L12 16.8L9.8 18L10.2 15.6L8.5 14L10.9 13.7L12 11.5Z" fill="#FEF3C7" />
    <path d="M7.5 3L10 8M16.5 3L14 8" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 3H15" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SilverMedalIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="14" r="7" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
    <path d="M12 11.5L13.1 13.7L15.5 14L13.8 15.6L14.2 18L12 16.8L9.8 18L10.2 15.6L8.5 14L10.9 13.7L12 11.5Z" fill="#F8FAFC" />
    <path d="M7.5 3L10 8M16.5 3L14 8" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 3H15" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BronzeMedalIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="14" r="7" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
    <path d="M12 11.5L13.1 13.7L15.5 14L13.8 15.6L14.2 18L12 16.8L9.8 18L10.2 15.6L8.5 14L10.9 13.7L12 11.5Z" fill="#FFEDD5" />
    <path d="M7.5 3L10 8M16.5 3L14 8" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 3H15" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
