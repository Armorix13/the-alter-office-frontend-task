import React, { useState } from "react";
import Profile from "../../assets/Sidebar/profile.png";
import Share from "../../assets/Card/Share.png";
import Like from "../../assets/Card/Like.png";
import UnLike from "../../assets/Card/unLike.png";
import Modal from "../Share/ShareModal";
import TwitterIcon from "../../assets/icon/Twitter.png";
import FacebookIcon from "../../assets/icon/Facebok.png";
import RedditIcon from "../../assets/icon/Reddiet.png";
import DiscordIcon from "../../assets/icon/Discord.png";
import WhatsappIcon from "../../assets/icon/Whatsapp.png";
import MessengerIcon from "../../assets/icon/Messenger.png";
import TelegramIcon from "../../assets/icon/Telegram.png";
import InstagramIcon from "../../assets/icon/Instagram.png";
import CopyIcon from "../../assets/icon/Copy.png";
import { BASE_URL } from "../../api";
import { timeAgo } from "../../utils";

interface FeedCardProps {
  username: string;
  postTime: string;
  content: string;
  hashtags: string;
  userImage?: string;
  imageUrls: string[];
  likes: number;
  isLiked?: boolean;
}

const FeedCard: React.FC<FeedCardProps> = ({
  username,
  postTime,
  content,
  hashtags,
  imageUrls,
  likes,
  isLiked,
}) => {
  let maxVisibleImages = 1;
  if (imageUrls.length === 2) {
    maxVisibleImages = 2;
  }

  const [showModal, setShowModal] = useState<boolean>(false);

  const socialPlatforms = [
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
    { name: "Reddit", icon: RedditIcon },
    { name: "Discord", icon: DiscordIcon },
    { name: "WhatSApp", icon: WhatsappIcon },
    { name: "Messenger", icon: MessengerIcon },
    { name: "Telegram", icon: TelegramIcon },
    { name: "Instagram", icon: InstagramIcon },
  ];

  return (
    <div className="bg-[#f7ebff] rounded-[26px] p-2 w-full max-w-[700px] mx-auto shadow-md">
      <div className="flex items-center mb-3">
        <img
          src={Profile}
          alt={`${username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="font-semibold text-gray-800 text-md">{username}</h2>
          <p className="text-xs text-gray-500">{timeAgo(postTime)}</p>
        </div>
      </div>

      <p className="text-gray-700 text-md mb-2">{content}</p>
      <p className="text-blue-500 text-sm font-medium mb-3">{hashtags}</p>

      <div className="flex gap-1">
        {imageUrls.slice(0, maxVisibleImages).map((url: any, index) => {
          const fileExtension = url.split(".").pop().toLowerCase();
          const isVideo = ["mp4", "avi", "mov", "webm", "mkv"].includes(
            fileExtension
          );

          return isVideo ? (
            <video
              key={index}
              className="rounded-lg h-[180px] object-cover w-[60%] md:w-full"
              controls
            >
              <source
                src={`${BASE_URL}${url}`}
                type={`video/${fileExtension}`}
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              key={index}
              src={`${BASE_URL}${url}`}
              alt={`Post Image ${index + 1}`}
              className="rounded-lg h-[180px] object-cover w-[60%] md:w-full"
            />
          );
        })}

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
          {isLiked ? (
            <img
              src={Like}
              alt="Liked Icon"
              className="w-[20px] h-[20px] object-cover mr-2 text-red-600"
            />
          ) : (
            <img
              src={UnLike}
              alt="Like Icon"
              className="w-[20px] h-[20px] object-cover mr-2"
            />
          )}
          <span>{likes}</span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center h-[40px] w-[120px] rounded-full bg-[#E6DAED] text-black font-semibold px-3 hover:bg-[#d8c3e2] transition duration-300"
        >
          <img
            src={Share}
            alt="Share Icon"
            className="w-[20px] h-[20px] object-cover mr-2"
          />
          Share
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Share Post"
      >
        <div className="grid grid-cols-4 gap-4">
          {socialPlatforms.map((platform, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src={platform.icon}
                alt={platform.name}
                className="w-[56px] h-[56px] bg-gray-100 rounded-full p-2 hover:bg-gray-200"
              />
              <span className="text-[12px] font-[400] mt-1">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-sm text-black mb-2 text-[16px] font-[600]">
            Page Link
          </p>
          <div className="flex items-center justify-between border bg-[#D9D9D9] rounded-md p-2">
            <span className="text-xs truncate">https://www.amav/feed</span>
            <img
              src={CopyIcon}
              alt={"Copy"}
              className="w-10 cursor-pointer h-10 rounded-full p-1 hover:bg-gray-200"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeedCard;
