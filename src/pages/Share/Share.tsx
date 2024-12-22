import Loader from '../../components/Loader/Loader'
import AddPost from '../../components/Post/AddPost'
import { BASE_URL, useGetPostByIdQuery } from '../../api'
import Profile from "../../assets/Sidebar/profile.png";
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useState } from 'react';
import MobileMenu from '../../components/Sidebar/MobileMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Hamburger from "../../assets/Icon/Hamburger.png";
import FeedCard from '../../components/Feeds/FeedCard';



const Share = () => {
    const { userDetail } = useSelector((state: RootState) => state.user);
    const [openMenu, setMenu] = useState<boolean>(false);
    const navigate = useNavigate();
    const params = useParams();


    const handleMenuToggle = () => {
        setMenu((prev) => !prev);
    };

    const { data: feedData, isLoading } = useGetPostByIdQuery(params.id);

    console.log("Data", feedData);



    return (
        <div className="h-full w-full relative flex justify-center">
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
                    <Loader />
                </div>
            )}
            <div className='w-full flex flex-col'>

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
                <div className="font-extrabold text-[25px] my-5">Feeds</div>
                {
                    feedData && (

                        <FeedCard
                            key={feedData?.posts?._id}
                            username={feedData?.posts?.userId?.fullName}
                            userImage={feedData?.posts?.userId.profileImage}
                            postTime={feedData?.posts?.createdAt}
                            content={feedData?.posts?.desc}
                            hashtags={feedData?.posts?.hashtags}
                            imageUrls={feedData?.posts?.images}
                            likes={feedData?.posts?.likeCount}
                            isLiked={feedData?.posts?.haveILiked}
                            _id={feedData?.posts?._id}
                            isShare={true}
                        />
                    )
                }
            </div>
            <AddPost />
            {openMenu && <MobileMenu />}
        </div>
    )
}

export default Share;
