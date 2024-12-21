import React, { useState } from "react";
import { BASE_URL } from "../../api";
import useVideoInViewport from "../../hooks/useViewPort";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const PostCard: React.FC<PostCardProps> = ({ image, title, likes }) => {
    const { videoRef } = useVideoInViewport();
    const [currentIndex, setCurrentindex] = useState<number>(0);
    const [currentPlayingVideo, setCurrentPlayingVideo] = useState<number | null>(
        null
    );

    const handleSlideChange = (swiper: any) => {
        setCurrentindex(swiper.activeIndex);
    };

    const getFileExtension = (filePath: string): string => {
        return filePath.split('.').pop()?.toLowerCase() || "";
    };

    return (
        <div className={`relative overflow-hidden`}>

            {
                image.length > 0 && (
                    <div className="text-[#f4f4f4] absolute max-720:text-[15px] max-720:right-2 max-720:top-2 top-2 right-[12%] font-bold z-10 text-[20px]">{currentIndex + 1}/{image.length}</div>
                )
            }
            <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper text-center max-720:h-[192px] max-720:w-[180px] h-[355px] w-[400px] gap-3"
                onSlideChange={handleSlideChange}
            >
                {image.map((file, index) => {
                    const fileExtension = getFileExtension(file);

                    if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) {
                        return (
                            <SwiperSlide key={`image-${index}`}>
                                <img
                                    src={`${BASE_URL}${file}`}
                                    alt={`Uploaded ${index}`}
                                    className="max-720:h-[192px] max-720:w-[160px] 721-1024:w-[350px] h-[350px] w-[400px] object-cover rounded-[16px] mb-2"
                                />
                            </SwiperSlide>
                        );
                    } else if (["mp4", "avi", "mov", "webm", "mkv"].includes(fileExtension)) {
                        return (
                            <SwiperSlide key={`video-${index}`}>
                                <video
                                    ref={videoRef}
                                    loop
                                    autoPlay={currentPlayingVideo === index}
                                    onPlay={() => setCurrentPlayingVideo(index)}
                                    onPause={() => currentPlayingVideo === index && setCurrentPlayingVideo(null)}
                                    src={`${BASE_URL}${file}`}
                                    className="max-720:h-[192px] max-720:w-[160px] 721-1024:w-[340px] h-[350px] w-[400px] object-cover rounded-[16px] mb-2"
                                />
                            </SwiperSlide>
                        );
                    }

                    return null;
                })}
            </Swiper>
            <div className="absolute max-720:bottom-[0.22rem] max-720:left-[0.4rem] 721-1024:bottom-[1rem] 721-1024:left-[1rem] bottom-[1rem] left-[1rem] z-50 bg-opacity-50 p-2 text-white w-full">
                <h2 className="text-[12px] font-semibold">{title.split(" ").slice(0, 4).join(" ")}...</h2>
                <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span className="text-xs">{likes}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
