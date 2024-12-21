import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthenticated } from '../../Redux/reducers/userSlice';
import { toast } from 'react-toastify';

interface SidebarItemProps {
  path: string;
  content: string;
  icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ path, content, icon }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(setAuthenticated(false));
    localStorage.removeItem("token");
    toast.success("Logout successfully");
    navigate("/")
  }

  return (
    <Link
      onClick={() => {
        if (content === "Logout") {
          handleLogout()
        }
      }}
      to={path}
      className="flex items-center py-2 px-4 mb-4 text-lg text-black hover:border-r-4 hover:border-pink-700 transition duration-300"
    >
      <div className="mr-3 text-xl">{icon}</div>
      <span>{content}</span>
    </Link>
  );
};

export default SidebarItem;
