import React from 'react';

const Skeleton = () => {
  return (
    <div className="w-52 h-20 bg-zinc-800 rounded-md animate-pulse p-4 border border-zinc-600">
      <div className="w-3/4 h-4 bg-zinc-700 rounded mb-2"></div>
      <div className="w-1/2 h-3 bg-zinc-700 rounded"></div>
    </div>
  );
};

export default Skeleton;