import React from 'react';

interface AvatarProps {
  initials: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ initials, className }) => {
  return (
    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-slate-300 text-2xl font-bold ${className}`}>
      {initials}
    </div>
  );
};

export default Avatar;