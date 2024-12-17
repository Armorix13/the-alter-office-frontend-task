import React from "react";
import Profile from "../../assets/Sidebar/profile.png";

interface SuggestedUserCardProps {
  name: string;
  photoUrl: string;
}

const SuggestedUserCard: React.FC<SuggestedUserCardProps> = ({
  name,
  photoUrl,
}) => {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition">
      <img
        src={Profile}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="text-sm font-medium text-gray-700">{name}</p>
    </div>
  );
};

export default SuggestedUserCard;
