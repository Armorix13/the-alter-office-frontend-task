import PostCard from "../../components/Post/MyPost";
import AddPost from "../../components/Post/AddPost";
import Back from "../../assets/Icon/Back.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { BASE_URL, useGetMyPostQuery } from "../../api/index";
import Cover from "../../assets/Profile/Cover.png";
import Profile from "../../assets/Sidebar/profile.png";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

const ProfilePage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { data: postdata, isLoading } = useGetMyPostQuery();

  useEffect(() => {
    if (postdata?.posts) {
      setPosts(postdata?.posts);
    }
  }, [postdata]);

  const { userDetail } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const renderPosts = () => {
    const pattern = ["small", "large", "large", "small", "small"];
    let postIndex = 0;
    const elements: JSX.Element[] = [];

    while (postIndex < posts.length) {
      for (let i = 0; i < pattern.length; i++) {
        if (postIndex >= posts.length) break;
        const size = pattern[i];
        const post = posts[postIndex];
        elements.push(
          <div key={post._id} className={`w-1/2 p-2`}>
            <PostCard
              image={post.images}
              title={post.desc}
              likes={post.likeCount}
              size={size}
              id={i}
            />
          </div>
        );
        postIndex++;
      }
    }
    return elements;
  };

  return (
    <div className="h-screen relative">
      <AddPost />
      <div className="relative flex flex-col items-center mb-3">
        <img
          onClick={() => navigate("/home/feeds")}
          src={Back}
          alt="back"
          className="absolute left-3 top-2 w-[32px] h-[32px]"
        />
        <button
          onClick={() => navigate("/home/edit-profile")}
          className=" w-[208px] h-[32px] absolute top-44 left-28 mt-15 px-4 py-1 border border-gray-400 rounded-2xl text-[12PX] font-[700]"
        >
          Edit Profile
        </button>
        <img
          src={userDetail?.coverImage ? `${BASE_URL}${userDetail?.coverImage}` : Cover}
          alt="Background"
          className="w-full h-40 object-cover rounded-bl-xl rounded-br-xl"
        />

        <div className="absolute top-28 left-2">
          <img src={userDetail?.profileImage ? `${BASE_URL}${userDetail?.profileImage}` : Profile} alt="Profile" className="rounded-full w-24 h-24" />
        </div>

        <div className="mt-16">
          <h1 className="text-xl font-bold">{userDetail?.fullName}</h1>
          <p className="text-gray-500">
            {userDetail?.boi}
          </p>
        </div>
      </div>
      <div className="text-[18px] font-[600] m-2">My Posts</div>
      {posts.length === 0 && !isLoading && (
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">You have not uploaded any post</p>
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50 z-20">
          <Loader />
        </div>
      )}
      <div className="flex flex-wrap -m-2">
        {!isLoading && renderPosts()}
      </div>
    </div>
  );
};

export default ProfilePage;
