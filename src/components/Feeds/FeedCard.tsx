import React from "react";
import Profile from "../../assets/Sidebar/profile.png";
import Share from "../../assets/Card/Share.png";
import Like from "../../assets/Card/Like.png";

interface FeedCardProps {
  username: string;
  postTime: string;
  content: string;
  hashtags: string;
  imageUrls: string[];
  likes: number;
}

const FeedCard: React.FC<FeedCardProps> = ({
  username,
  postTime,
  content,
  hashtags,
  imageUrls,
  likes,
}) => {
  let maxVisibleImages = 1;
  if (imageUrls.length === 2) {
    maxVisibleImages = 2;
  }

  return (
    <div className="bg-[#f7ebff] rounded-[26px] z-10 p-2 w-full max-w-[700px] mx-auto shadow-md">
      <div className="flex items-center mb-3">
        <img
          src={Profile}
          alt={`${username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="font-semibold text-gray-800 text-md">{username}</h2>
          <p className="text-xs text-gray-500">{postTime}</p>
        </div>
      </div>

      <p className="text-gray-700 text-md mb-2">{content}</p>
      <p className="text-blue-500 text-sm font-medium mb-3">{hashtags}</p>

      <div className="flex gap-1">
        {imageUrls.slice(0, maxVisibleImages).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Post Image ${index + 1}`}
            className={`rounded-lg h-[180px] object-cover w-[60%] md:w-full`}
          />
        ))}
        {imageUrls.length > maxVisibleImages && (
          <div className="relative h-[180px] md:w-full w-[40%] rounded-lg cursor-pointer overflow-hidden">
            <img
              src={imageUrls[maxVisibleImages]}
              alt="More Images"
              className=" h-full object-cover opacity-50 w-full"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-60 rounded-lg">
              <span className="text-white text-lg font-semibold">
                +{imageUrls.length - maxVisibleImages} More
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-3 items-center justify-between text-gray-600 text-sm">
        <div className="flex items-center">
          <img
            src={Like}
            alt="Like Icon"
            className="w-[20px] h-[20px] object-cover mr-2"
          />
          <span>{likes}</span>
        </div>

        <button className="flex items-center h-[40px] w-[120px] rounded-full bg-[#E6DAED] text-black font-semibold px-3 hover:bg-[#d8c3e2] transition duration-300">
          <img
            src={Share}
            alt="Share Icon"
            className="w-[20px] h-[20px] object-cover mr-2"
          />
          Share
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
