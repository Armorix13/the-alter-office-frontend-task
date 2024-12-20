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
import { BASE_URL, useMakeLikeDislikeMutation } from "../../api";
import { timeAgo } from "../../utils";
import { toast } from "react-toastify";

interface FeedCardProps {
  username: string;
  postTime: string;
  content: string;
  hashtags: string;
  userImage?: string;
  imageUrls: string[];
  likes: number;
  isLiked?: boolean;
  _id?: string;
}

const FeedCard: React.FC<FeedCardProps> = ({
  username,
  postTime,
  content,
  hashtags,
  imageUrls,
  likes,
  isLiked,
  userImage,
  _id
}) => {
  let maxVisibleImages = 1;
  if (imageUrls.length === 2) {
    maxVisibleImages = 2;
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);



  const socialPlatforms = [
    { name: "Twitter", icon: TwitterIcon, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=http://localhost:5173/feeds/${_id}` },
    { name: "Facebook", icon: FacebookIcon, url: `https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/feeds/${_id}` },
    { name: "Reddit", icon: RedditIcon, url: `https://www.reddit.com/submit?url=http://localhost:5173/feeds/${_id}&title=${encodeURIComponent(content)}` },
    { name: "Discord", icon: DiscordIcon, url: `https://discord.com/channels/@me?text=${encodeURIComponent(content)}%20http://localhost:5173/feeds/${_id}` },
    { name: "WhatsApp", icon: WhatsappIcon, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(content)}%20http://localhost:5173/feeds/${_id}` },
    { name: "Messenger", icon: MessengerIcon, url: `https://www.messenger.com/t/?text=${encodeURIComponent(content)}%20http://localhost:5173/feeds/${_id}` },
    { name: "Telegram", icon: TelegramIcon, url: `https://t.me/share/url?url=http://localhost:5173/feeds/${_id}&text=${encodeURIComponent(content)}` },
    { name: "Instagram", icon: InstagramIcon, url: `https://www.instagram.com/?url=http://localhost:5173/feeds/${_id}` },
  ];

  const styleHashtags = (text: string) => {
    const regex = /#\w+/g;
    const parts = [];
    let lastIndex = 0;
    text.replace(regex, (match, offset) => {
      if (offset > lastIndex) {
        parts.push(text.slice(lastIndex, offset));
      }
      parts.push(
        <span key={offset} style={{ color: "#3C8DFF" }}>
          {match}
        </span>
      );
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  const handleCopy = (): void => {
    const url = `http://localhost:5173/feeds/${_id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard");
    }).catch((err) => {
      console.error("Failed to copy the link: ", err);
    });
  };

  const handleShare = (platformUrl: string): void => {
    window.open(platformUrl, "_blank");
  };

  const [makeLikeDislike] = useMakeLikeDislikeMutation();


  const handleLike = async (id: string | any): Promise<any> => {
    try {
      const res = await makeLikeDislike(id).unwrap();
      if (res && res.success) {
        setLike(!like);

      }
    } catch (error) {
      console.error("Error during like/dislike action:", error);
    }
  };

  return (
    <div className="bg-[#f7ebff] mt-[10px] rounded-[26px] p-2 w-full max-w-[700px] mx-auto shadow-md">
      <div className="flex items-center mb-3">
        <img
          src={userImage ? `${BASE_URL}${userImage}` : Profile}
          alt={`${username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="font-semibold text-gray-800 text-md">{username}</h2>
          <p className="text-xs text-gray-500">{timeAgo(postTime)}</p>
        </div>
      </div>

      <p className="text-gray-700 text-md mb-2">{styleHashtags(content)}</p>
      <p className="text-blue-500 text-sm font-medium mb-3">{hashtags}</p>

      <div className="flex gap-1">
        {imageUrls.slice(0, maxVisibleImages).map((url: any, index: any) => {
          const fileExtension = url?.split(".").pop().toLowerCase();
          const isVideo = ["mp4", "avi", "mov", "webm", "mkv"].includes(fileExtension);

          return isVideo ? (
            <video
              key={index}
              className="rounded-lg h-[180px] object-cover w-[50%] md:w-full"
              controls
            >
              <source src={`${BASE_URL}${url}`} type={`video/${fileExtension}`} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              key={index}
              src={`${BASE_URL}${url}`}
              alt={`Post Image ${index + 1}`}
              className="rounded-lg h-[180px] object-cover w-[50%] md:w-full"
            />
          );
        })}

        {imageUrls.length > maxVisibleImages && (
          <div className="relative h-[180px] md:w-full w-[40%] rounded-lg cursor-pointer overflow-hidden">
            <img
              src={`${BASE_URL}${imageUrls[maxVisibleImages]}`}
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
        <div onClick={() => handleLike(_id)} className="flex items-center">
          {isLiked || like ? (
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
              onClick={() => handleShare(platform.url)} // Share on the selected platform
            >
              <img
                src={platform.icon}
                alt={platform.name}
                className="w-[56px] h-[56px] bg-gray-100 rounded-full p-2 hover:bg-gray-200"
              />
              <span className="text-[12px] font-[400] mt-1">{platform.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-sm text-black mb-2 text-[16px] font-[600]">Page Link</p>
          <div className="flex items-center justify-between border bg-[#D9D9D9] rounded-md p-2">
            <span className="text-xs truncate">http://localhost:5173/feeds/{_id}</span>
            <img
              onClick={handleCopy}
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
