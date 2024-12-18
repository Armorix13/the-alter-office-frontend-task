import Bblack from "../../assets/Icon/Bback.png";
import MediaOption from "../../components/MediaOption/Media";
import PhotosIcon from "../../assets/create/Photos.png";
import VideoIcon from "../../assets/create/Video.png";
import CameraIcon from "../../assets/create/Camera.png";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const handleBack = (): void => {
    navigate("/home/feeds");
  };

  return (
    <div className="h-full w-full relative flex justify-center">
      <div className="relative w-full flex flex-col items-center mb-3">
        <div className="absolute cursor-pointer flex left-3 top-2">
          <img onClick={handleBack} src={Bblack} alt="back" className=" w-[32px] h-[32px]" />
          <span className="text-[20px] font-[800] text-black">New Post</span>
        </div>

        <div className="max-720:w-[333px] max-720:h-[248px] h-[400px] w-[700px] bg-[#d9d9d9] mt-16 rounded-[16px]">
          <textarea
          className="w-full h-full bg-[#d9d9d9] rounded-[16px] p-2 focus:outline-none"
          />
        </div>

        <div className="p-3 space-y-2 max-720:w-[78px] max-720:h-[84px] absolute max-720:left-2 left-14 max-720:top-80 top-[30rem]">
          <MediaOption image={PhotosIcon} content="Photos" />
          <MediaOption image={VideoIcon} content="Video" />
          <MediaOption image={CameraIcon} content="Camera" />
        </div>
      </div>
      <button className="bg-black absolute bottom-1 rounded-[36px] w-[328px] h-[48px] text-white text-[16px] font-[700]">
        Create
      </button>
    </div>
  );
};

export default Create;
