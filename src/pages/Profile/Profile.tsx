import PostCard from "../../components/Post/MyPost";
import AddPost from "../../components/Post/AddPost";
import Back from "../../assets/Icon/Back.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api";

const posts = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/957769/pexels-photo-957769.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Design meet",
    likes: 67,
    size: "small",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/26795650/pexels-photo-26795650/free-photo-of-close-up-of-a-couples-hands.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Working on a B2B...",
    likes: 40,
    size: "large",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/5912024/pexels-photo-5912024.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    title: "Parachute ❤️",
    likes: 65,
    size: "large",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/16021141/pexels-photo-16021141/free-photo-of-photo-of-25-de-abril-bridge-lisbon-portugal.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Parachute ❤️",
    likes: 65,
    size: "large",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/7670035/pexels-photo-7670035.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Parachute ❤️",
    likes: 65,
    size: "large",
  },
];

const ProfilePage = () => {
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
          <div key={post.id} className={`w-1/2 p-2`}>
            <PostCard
              image={post.image}
              title={post.title}
              likes={post.likes}
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
          src={`${BASE_URL}${userDetail?.coverImage}`}
          alt="Background"
          className="w-full h-40 object-cover rounded-bl-xl rounded-br-xl"
        />

        <div className="absolute top-28 left-2">
          <img src={`${BASE_URL}${userDetail?.profileImage}`} alt="Profile" className="rounded-full w-24 h-24" />
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
      <div className="flex flex-wrap -m-2">{renderPosts()}</div>
    </div>
  );
};

export default ProfilePage;
