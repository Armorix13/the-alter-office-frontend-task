import PostCard from "../../components/Post/MyPost";
import AddPost from "../../components/Post/AddPost";
import Back from "../../assets/Icon/Back.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { BASE_URL, LIMIT, useGetMyPostQuery } from "../../api/index";
import Cover from "../../assets/Profile/Cover.png";
import Profile from "../../assets/Sidebar/profile.png";
import { useCallback, useEffect, useState } from "react";


interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  posts?: any[];
  pagination?: {
    totalPosts: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

const ProfilePage = () => {

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data: postdata, isFetching } = useGetMyPostQuery({
    page,
    limit: LIMIT,
  });



  const handleAppendPost = useCallback(
    (data: ApiResponse<any[]>) => {
      setPosts((prevState) => {
        const newPosts = data.posts || [];
        const uniquePosts = newPosts.filter(
          (post) => !prevState.some((existingPost) => existingPost._id === post._id)
        );
        const updatedPosts = [...prevState, ...uniquePosts];
        setHasMore(updatedPosts.length < (data.pagination?.totalPosts || 0));
        return updatedPosts;
      });
    },
    [postdata]
  );


  useEffect(() => {
    if (postdata?.posts) {
      handleAppendPost(postdata);
    }
  }, [postdata, handleAppendPost]);

  const fetchMoreData = () => {
    if (hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  fetchMoreData();


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
            Just someone who loves designing, sketching, and finding beauty in
            the little things 💞
          </p>
        </div>
      </div>
      <div className="text-[18px] font-[600] m-2">My Posts</div>
      <div className="flex flex-wrap -m-2">
        {renderPosts()}
      </div>
    </div>
  );
};

export default ProfilePage;
