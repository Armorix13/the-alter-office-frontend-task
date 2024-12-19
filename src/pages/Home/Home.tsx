import FeedCard from "../../components/Feeds/FeedCard";
import AddPost from "../../components/Post/AddPost";
import Hamburger from "../../assets/Icon/Hamburger.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../../components/Sidebar/MobileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { BASE_URL } from "../../api/index";
import Profile from "../../assets/Sidebar/profile.png";
import { useGetPostQuery } from "../../api";

const Home = () => {
  const { userDetail } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [openMenu, closeMenu] = useState<Boolean>(false);
  const handleMenuToggle = () => {
    closeMenu(!openMenu);
  };
  const { data: posts } = useGetPostQuery();
  console.log({ posts });

  return (
    <>
      <div className="h-full w-full flex flex-col relative">
        <div className="h-[50px] flex justify-between w-full bg-white p-2 lg:hidden">
          <div
            onClick={handleMenuToggle}
            className="h-[50px] w-[50px] bg-[#F5F5F5] rounded-full flex justify-center items-center"
          >
            <img src={Hamburger} className="w-[24px] h-[24px]" />
          </div>
          <img
            onClick={() => navigate("/home/profile")}
            src={userDetail?.profileImage ? `${BASE_URL}${userDetail?.profileImage}` : Profile}
            alt={`avatar`}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <AddPost />
        <div className="font-extrabold text-[30x] mt-10">Feeds</div>
        <div className="grid grid-cols-1 mt-[30px] gap-4">
          <FeedCard
            username="Aarav"
            userImage="https://randomuser.me/api/portraits/men/75.jpg"
            postTime="2 hours ago"
            content="Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽"
            hashtags="#NYC #Travel"
            imageUrls={[
              "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
              "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
              "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
            ]}
            likes={67}
          />
          <FeedCard
            username="Aarav"
            userImage="https://randomuser.me/api/portraits/men/75.jpg"
            postTime="2 hours ago"
            content="Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽"
            hashtags="#NYC #Travel"
            imageUrls={[
              "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
              "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            ]}
            likes={67}
          />
          <FeedCard
            username="Aarav"
            userImage="https://randomuser.me/api/portraits/men/75.jpg"
            postTime="2 hours ago"
            content="Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽"
            hashtags="#NYC #Travel"
            imageUrls={[
              "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
              "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            ]}
            likes={67}
          />
        </div>
      </div>
      {openMenu && <MobileMenu />}
    </>
  );
};

export default Home;
