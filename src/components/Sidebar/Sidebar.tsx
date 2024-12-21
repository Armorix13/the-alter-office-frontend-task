import React from "react";
import { FaHome, FaUserAlt } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Profile from "../../assets/Sidebar/profile.png";
import { BASE_URL } from "../../api";
import { IoIosLogOut } from "react-icons/io";



interface SidebarItemType {
  path: string;
  content: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const { userDetail } = useSelector((state: RootState) => state.user);
  const list: SidebarItemType[] = [
    {
      path: "/home/feeds",
      content: "Feeds",
      icon: <FaHome />,
    },
    {
      path: "/home/profile",
      content: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/",
      content: "Logout",
      icon: <IoIosLogOut />,
    },
  ];
  return (
    <div className="w-full h-screen bg-gray-300 text-white flex flex-col py-6 px-4 relative">
      <div className="absolute text-center flex gap-2 bottom-4 h-[50px] w-[200px]">
        <img
          src={userDetail?.profileImage ? `${BASE_URL}${userDetail?.profileImage}` : Profile}
          alt="login"
          className="w-[50px] h-[50px] rounded-full"
        />

        <div className="text-[16px] w-full text-black font-[700] mt-5">
          {userDetail?.fullName}
        </div>
      </div>

      <div className="flex text-center w-full flex-col justify-center mt-2 mb-5">
        <div className="w-full flex justify-center">
          <img
            src={"/fav.png"}
            alt="login"
            className="rounded-3xl w-[46px] h-[34px]"
          />
        </div>
        <div className="text-[26px] text-black sm:text-[20px] font-[600] ml-2">
          Vibesnap
        </div>
      </div>
      {list.map((item, index) => (
        <SidebarItem
          key={index}
          path={item.path}
          content={item.content}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Sidebar;
