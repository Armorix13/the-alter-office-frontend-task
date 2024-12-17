import React from "react";
import SuggestedUserCard from "../SuggestedCard/SuggestedCard";

const suggestedUsers = [
  { name: "Alice Johnson", photoUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Michael Brown", photoUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Sophia Davis", photoUrl: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "James Smith", photoUrl: "https://randomuser.me/api/portraits/men/4.jpg" },
  { name: "Emily White", photoUrl: "https://randomuser.me/api/portraits/women/5.jpg" },
  { name: "William Moore", photoUrl: "https://randomuser.me/api/portraits/men/6.jpg" },
  { name: "Isabella Jones", photoUrl: "https://randomuser.me/api/portraits/women/7.jpg" },
  { name: "Ethan Clark", photoUrl: "https://randomuser.me/api/portraits/men/8.jpg" },
  { name: "Mia Taylor", photoUrl: "https://randomuser.me/api/portraits/women/9.jpg" },
  { name: "Alexander Lewis", photoUrl: "https://randomuser.me/api/portraits/men/10.jpg" },
];

const RightSideBar: React.FC = () => {
  return (
    <div className="bg-gray-300 h-screen p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Suggested Users</h2>
      <div className="space-y-2">
        {suggestedUsers.map((user, index) => (
          <SuggestedUserCard
            key={index}
            name={user.name}
            photoUrl={user.photoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
