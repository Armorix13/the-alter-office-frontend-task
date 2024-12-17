import FeedCard from "../../components/Feeds/FeedCard";

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="font-extrabold text-[30x] fixed">Feeds</div>
      <div className="grid grid-cols-1 mt-[40px] gap-4">
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
  );
};

export default Home;
