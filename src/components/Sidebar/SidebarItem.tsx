import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  path: string;
  content: string;
  icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ path, content, icon }) => {
  return (
    <Link
      to={path}
      className="flex items-center py-2 px-4 mb-4 text-lg text-black hover:border-r-4 hover:border-pink-700 transition duration-300"
    >
      <div className="mr-3 text-xl">{icon}</div>
      <span>{content}</span>
    </Link>
  );
};

export default SidebarItem;
