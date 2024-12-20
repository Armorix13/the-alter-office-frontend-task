import FeedCard from "../../components/Feeds/FeedCard";
import AddPost from "../../components/Post/AddPost";
import Hamburger from "../../assets/Icon/Hamburger.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileMenu from "../../components/Sidebar/MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { BASE_URL } from "../../api/index";
import Profile from "../../assets/Sidebar/profile.png";
import { useGetPostsQuery } from "../../api";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  appendPosts,
  setHasMore,
  setPagination,
} from "../../Redux/reducers/feedSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [openMenu, closeMenu] = useState<Boolean>(false);
  const handleMenuToggle = () => {
    closeMenu(!openMenu);
  };
  const { posts, hasMore, currentPage, totalPages } = useSelector(
    (state: RootState) => state.feed
  );
  
  const [page, setPage] = useState(currentPage);

  const { data: postdata ,isFetching} = useGetPostsQuery({
    page,
    limit: 2,
  });

  useEffect(() => {
    if (postdata) {
      dispatch(appendPosts(postdata.posts));
      dispatch(
        setPagination({
          currentPage: postdata.currentPage,
          totalPages: postdata.totalPages,
        })
      );
      dispatch(setHasMore(postdata.currentPage < postdata.totalPages));
    }
  }, [postdata, dispatch ,isFetching]);
  
  

  const fetchMoreData = () => {
    if (page < totalPages && !isFetching) {
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
        <div className="font-extrabold text-[30x] mt-10">Feeds</div>
        <div className="grid grid-cols-1 mt-[30px] gap-4">
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollThreshold={0.9}
            scrollableTarget="scrollableDiv"
          >
            <div
              id="scrollableDiv"
              className="grid grid-cols-1 mt-[30px] gap-4"
            >
              {posts.map((post: any) => (
                <FeedCard
                  key={post._id}
                  username={post.userId.fullName}
                  userImage={post.userId.profileImage}
                  postTime={post.createdAt}
                  content={post.desc}
                  hashtags={post.hashtags}
                  imageUrls={post.images}
                  likes={post.likeCount}
                />
              ))}
            </div>
          </InfiniteScroll>
          {/* {postdata?.posts?.map((post: any) => (
            <FeedCard
              key={post.id}
              username={post.userId.fullName}
              userImage={post.userId.profileImage}
              postTime={post.createdAt}
              content={post.desc}
              hashtags={post.hashtags}
              imageUrls={post.images}
              likes={post.likeCount}
            />
          ))} */}
        </div>
      </div>
      {openMenu && <MobileMenu />}
    </>
  );
};

export default Home;
