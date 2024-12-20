import FeedCard from "../../components/Feeds/FeedCard";
import AddPost from "../../components/Post/AddPost";
import Hamburger from "../../assets/Icon/Hamburger.png";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import MobileMenu from "../../components/Sidebar/MobileMenu";
import Profile from "../../assets/Sidebar/profile.png";
import { BASE_URL, LIMIT, useGetPostsQuery } from "../../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

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

const Home = () => {
  const navigate = useNavigate();
  const { userDetail } = useSelector((state: RootState) => state.user);
  const [openMenu, setMenu] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data: postdata, isFetching } = useGetPostsQuery({
    page,
    limit: LIMIT,
  });

  const handleMenuToggle = () => {
    setMenu((prev) => !prev);
  };

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
            src={
              userDetail?.profileImage
                ? `${BASE_URL}${userDetail?.profileImage}`
                : Profile
            }
            alt={`avatar`}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <AddPost />
        <div className="font-extrabold text-[25px] my-5">Feeds</div>
        <div
          id="scrollableDiv"
          className="grid grid-cols-1 gap-4 overflow-y-auto"
        >
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            scrollThreshold={0.9}
          >
            {posts.map((post: any, index) => (
              <FeedCard
                key={index}
                username={post.userId.fullName}
                userImage={post.userId.profileImage}
                postTime={post.createdAt}
                content={post.desc}
                hashtags={post.hashtags}
                imageUrls={post.images}
                likes={post.likeCount}
                isLiked={post.haveILiked}
                _id={post._id}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      {openMenu && <MobileMenu />}
    </>
  );
};

export default Home;
