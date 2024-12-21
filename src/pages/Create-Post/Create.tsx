import Bblack from "../../assets/Icon/Bback.png";
import MediaOption from "../../components/MediaOption/Media";
import PhotosIcon from "../../assets/create/Photos.png";
import VideoIcon from "../../assets/create/Video.png";
import CameraIcon from "../../assets/create/Camera.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useCreatePostMutation } from "../../api";
import Loader from "../../components/Loader/Loader";
import useVideoInViewport from "../../hooks/useViewPort";

const Create = () => {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<number | null>(
    null
  );
  const [currentIndex, setCurrentindex] = useState<number>(0);
  const [bio, setBio] = useState<string>("");

  const { videoRef } = useVideoInViewport();

  const [createPost, { isLoading }] = useCreatePostMutation();


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setMediaFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleEditClick = (fileType: "image" | "video") => {
    if (fileType === "image" && imageInputRef.current) {
      imageInputRef.current.click();
    } else if (fileType === "video" && videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const handleBack = (): void => {
    navigate("/home/feeds");
  };

  const handleSlideChange = (swiper: any) => {
    setCurrentindex(swiper.activeIndex);
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("desc", bio);
      mediaFiles.forEach((file) => {
        formData.append(`images`, file);
      });
      const response = await createPost(formData).unwrap();
      if (response) {
        console.log("Post created successfully:", response);
        handleBack();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <>
      <div className="relative w-full min-h-screen items-center flex flex-col">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <Loader />
          </div>
        )}
        <div className="w-full">
          <div className="cursor-pointer flex">
            <img
              onClick={handleBack}
              src={Bblack}
              alt="back"
              className="w-[32px] h-[32px]"
            />
            <span className="text-[20px] font-[800] text-black">New Post</span>
          </div>
        </div>

        <div className="w-full flex flex-col  gap-3 justify-center items-center mb-3 mt-2">
          <div className={`bg-[#ffffff] relative w-full rounded-[16px] ${mediaFiles.length > 0 && "h-[285px] w-full"}`}>
            {
              mediaFiles.length > 0 && (
                <div className="text-[#f4f4f4] absolute max-720:right-14 max-720:top-2 right-[35%] font-bold z-10 text-[24px]">{currentIndex + 1}/{mediaFiles.length}</div>
              )
            }
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper text-center w-[320px] gap-3"
              onSlideChange={handleSlideChange}
            >
              {mediaFiles.map((file, index) => {
                if (file.type.startsWith("image/")) {
                  return (
                    <SwiperSlide key={`image-${index}`}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index}`}
                        className="h-[285px] w-[310px] object-cover rounded-[16px] mb-2"
                      />
                    </SwiperSlide>
                  );
                } else if (file.type.startsWith("video/")) {
                  return (
                    <SwiperSlide key={`video-${index}`}>
                      <video
                        ref={videoRef}
                        loop
                        autoPlay={currentPlayingVideo === index}
                        onPlay={() => setCurrentPlayingVideo(index)}
                        onPause={() =>
                          currentPlayingVideo === index &&
                          setCurrentPlayingVideo(null)
                        }
                        src={URL.createObjectURL(file)}
                        className="h-[285px] w-[310px] object-cover rounded-[16px] mb-2"
                      />
                    </SwiperSlide>
                  );
                }
                return null;
              })}
            </Swiper>

            <div className="w-full flex">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="max-720:w-full max-720:h-[248px] h-[350px] w-full bg-[#d9d9d9] rounded-[16px] p-2 focus:outline-none mt-5"
                placeholder="Write your caption..."
              />
            </div>

            <div className=" mt-5 space-y-2 p-2">
              <MediaOption
                onChange={() => handleEditClick("image")}
                image={PhotosIcon}
                content="Photos"
              />
              <MediaOption
                onChange={() => handleEditClick("video")}
                image={VideoIcon}
                content="Video"
              />
              <MediaOption image={CameraIcon} content="Camera" />
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                disabled={bio === "" && mediaFiles.length === 0}
                onClick={handlePost}
                className={` ${bio === "" && mediaFiles.length === 0 ? "bg-gray-600" : "bg-black"} mt-20 mx-auto rounded-[36px] w-[328px] h-[48px] text-white text-[16px] font-[700]`}
              >
                Create
              </button>
            </div>


          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </>
  );
};

export default Create;
