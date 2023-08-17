import React from 'react';

export default function Shimmer() {
  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 p-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="space-y-5 rounded-2xl bg-white/5 p-4">
          <div className="h-40 rounded-lg bg-rose-100/10 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-3 w-4/5 rounded-lg bg-rose-100/20 animate-pulse"></div>
            <div className="h-3 w-3/5 rounded-lg bg-rose-100/10 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
