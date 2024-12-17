import React from "react";

interface PostCardProps {
    image: string;
    title: string;
    likes: number;
    size: string;
    id: number;
}

const PostCard: React.FC<PostCardProps> = ({ image, title, likes, size, id }) => {
    const cardSizeClass = size === "small" ? "max-720:h-[192px] h-[300px] w-full" : "max-720:h-[240px] h-[400px] w-full";
    return (
        <div className={`relative overflow-hidden ${id > 1 && size === 'large' ? "max-720:mt-[-54px] mt-[-100px]" : ""} rounded-lg ${cardSizeClass}`}>
            <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-opacity-50 p-2 text-white w-full">
                <h3 className="text-sm font-semibold">{title}</h3>
                <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span className="text-xs">{likes}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
