import React from 'react';

interface MediaOptionProps {
  image: string;
  content: string;
}

const MediaOption: React.FC<MediaOptionProps> = ({ image, content }) => {
  return (
    <div className="flex items-center space-x-3 hover:opacity-80 cursor-pointer">
      <img src={image} alt={content} className="w-8 h-8" />
      <span className="text-lg font-medium text-gray-900">{content}</span>
    </div>
  );
};

export default MediaOption;
